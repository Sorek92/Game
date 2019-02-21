
var mongoose = require('mongoose');

// definicja schematu użytkownika
var paramsSchema = mongoose.Schema({

    name       : String,
    elements     : []
});



module.exports = mongoose.model('Param', paramsSchema);