const mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'A title is required'] },
    subtitle: { type: String },
    body: { type: String, required: [true, 'A body is required'] },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: [true, 'A categoryid is required'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: [true, 'An userid is required'] },
    urlImage: { type: String },
    activePost: { type: Boolean, default: true },
    comments: [{ body: { type: String }, date: { type: Date, default: Date.now } }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Posts', PostSchema);