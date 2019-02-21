
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// definicja schematu użytkownika
var userSchema = mongoose.Schema({

    nickname	 	 : String,
    email        : String,
    password     : String

});

// generowanie zaszyfrowanego hasła
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// sprawdzanie hasła
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);