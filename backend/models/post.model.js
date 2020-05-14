const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'A title is required'] },
    subtitle: { type: String },
    body: { type: String, required: [true, 'A body is required'] },
    categoryId: { type: Number, required: [true, 'A category is required'] },
    userId: { type: Number, required: [true, 'An user is required'] },
    urlImage: { type: String },
    comments: [{ body: { type: String }, date: { type: Date, default: Date.now } }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('posts', postSchema);