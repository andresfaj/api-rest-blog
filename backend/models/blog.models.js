const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    body: String,
    urlimage: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now},

});

module.exports = mongoose.model('blog', blogSchema);