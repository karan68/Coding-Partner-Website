var mongoose = require('mongoose');
var crypto = require('crypto');

//a salt is random data that is used as an additional input to a one-way function that hashes data, 
//a password or passphrase. Salts are used to safeguard passwords in storage. ... A new salt is randomly generated 
//for each password.

//Hashing is a one-way encryption process such that a hash value cannot be reverse engineered to get to 
//the original plain text. Hashing is used in encryption to secure the information shared between two parties.
 //The passwords are transformed into hash values so that even if a security breach occurs, PINs stay protected.

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  facebookId: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  return this.hash === hash;
};

module.exports = mongoose.model('User', userSchema);
