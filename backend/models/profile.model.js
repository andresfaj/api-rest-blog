var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
    profileId: Number,
    name: String,
    description: String,
});

module.exports = mongoose.model('profiles', profileSchema);