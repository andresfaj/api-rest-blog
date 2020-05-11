const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    roleId: { type: Number, required: true },
    email: { type: String, required: true },
    urlImage: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', userSchema);