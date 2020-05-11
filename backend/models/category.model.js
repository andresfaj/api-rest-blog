var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    categoryId: Number,
    name: String
});

module.exports = mongoose.model('categories', categorySchema);