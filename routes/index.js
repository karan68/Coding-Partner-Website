var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodingPartner - a platform for coding' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'CodingPartner - a platform for coding'});
});

router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: 'CodingPartner - a platform for coding'});
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
      res.render('contact', {
        title: 'CodingPartner - a platform for coding',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      var mailOptions = {
        from: 'CodingPartner <no-reply@codingpartner.com>',
        to: 'mekaranyadav3@gmail.com',
        subject: 'You got a new message from visitor 💋 😽',
        text: req.body.message
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        res.render('thank', { title: 'CodingPartner - a platform for coding.'});
      });

    }
  });

module.exports = router;
