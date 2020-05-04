const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    lastName: String,
    profileId: Number,
    email: String,
    urlImage: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', userSchema);