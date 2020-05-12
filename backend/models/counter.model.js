var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

counterSchema.methods.get

module.exports = mongoose.model('counters', counterSchema);