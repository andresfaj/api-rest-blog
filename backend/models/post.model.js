const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    body: { type: String, required: true },
    categoryId: { type: Number, required: true },
    userId: { type: Number, required: true },
    urlImage: { type: String },
    comments: [{ body: { type: String }, date: { type: Date, default: Date.now } }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('posts', postSchema);