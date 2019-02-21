
var mongoose = require('mongoose');

// definicja schematu użytkownika
var heroSchema = mongoose.Schema({

    nacja        : String,
    experiance     : String,
    publisher_id : String


});



module.exports = mongoose.model('Heroes', heroSchema);