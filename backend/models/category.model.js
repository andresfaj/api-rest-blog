var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var categorySchema = mongoose.Schema({
    name: { type: String, unique: true, lowercase: true, require: [true, "A name is required"] },
    date: { type: Date, default: Date.now }
});

categorySchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('categories', categorySchema);