const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'A title is required'] },
    subtitle: { type: String },
    body: { type: String, required: [true, 'A body is required'] },
    categoryId: { type: Number, required: [true, 'A category is required'] },
    userEmail: { type: String, required: [true, 'An user email is required'] },
    urlImage: { type: String },
    activePost: { type: Boolean, default: true },
    comments: [{ body: { type: String }, date: { type: Date, default: Date.now } }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('posts', postSchema);