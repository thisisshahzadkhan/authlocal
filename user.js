var mongoose = require('mongoose');
var passportLocal = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username : String,
    devicehash:String,
    password : String
});

userSchema.plugin(passportLocal);
module.exports = mongoose.model('user',userSchema);