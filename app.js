var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// var compiler = require('compilex');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var passport = require('passport');
var session = require('express-session');

require('./passport');
var config = require('./config');

var indexRoute = require('./routes/index');
var authRoute = require('./routes/auth');
var taskRoute = require('./routes/task');

mongoose.connect(config.dbConnstring,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    
    
}).then(()=>{
  console.log('Connected to DB');
}).catch((err)=>
  
  console.log(err));
  

global.User = require('./models/user');
global.Task = require('./models/task');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser().);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(cookieParser());
app.use(session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

////Serves resources from public folder
app.use(express.static(path.join(__dirname, 'public')));

//creating session for logged in user
app.use(function(req, res, next) {
  if (req.isAuthenticated()) {
     //if the user is autheticated,store it as current user
    res.locals.user = req.user;
  }
  //call the next function
  next();
});

app.use('/', indexRoute);
app.use('/', authRoute);
app.use('/', taskRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
