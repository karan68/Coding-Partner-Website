var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

//In serialize user you decide what to store in the session. Here I'm storing the user id only
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

//Here you retrieve all the info of the user
// from the session storage using the user id stored in the session earlier using serialize user.
passport.deserializeUser(function (id, done) {
  User.findOne({_id: id}, function (err, user) {
    done(err, user);
  })
});

//The local authentication strategy authenticates users using a username and password. 
//The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
//authenticating with certain edge cases
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function (username, password, done) {
    User.findOne({email: username}, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username or password'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect username or password'
        });
      }

      return done(null, user);
    })
  }
));

passport.use(new FacebookStrategy({
    clientID: '427542098853205',
    clientSecret: 'fb733833dcd274f14ed326d4deb382b4',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
  },
  function(token, refreshToken, profile, done) {
    User.findOne({'facebookId': profile.id}, function(err, user) {
      if (err) return done(err);

      if (user) {
        return done(null, user);
      } else {
        User.findOne({email: profile.emails[0].value}, function (err, user) {
          if (user) {
            user.facebookId = profile.id
            return user.save(function (err) {
              if (err) return done(null, false, { message: "Can't save user info"});
              return done(null, user);
            })
          }
         //create new user
          var user = new User();
          user.name = profile.displayName;
          user.email = profile.emails[0].value;
          user.facebookId = profile.idea
          user.save(function (err) {
            if (err) return done(null, false, { message: "Can't save user info"});
            return done(null, user);
          });
        })
      }


    });
  }
));
