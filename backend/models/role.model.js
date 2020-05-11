var mongoose = require('mongoose');

var roleSchema = mongoose.Schema({
    roleId: Number,
    name: String,
    description: String,
});

module.exports = mongoose.model('roles', roleSchema);