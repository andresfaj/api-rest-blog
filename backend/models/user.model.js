const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

var userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'A name is required'] },
    lastName: { type: String, required: [true, 'A LastName is required'] },
    role: { type: String, required: [true, 'A role is required'], enum: validRoles },
    email: { type: String, unique: true, required: [true, 'An email is required'] },
    password: { type: String, required: [true, 'A password is required'] },
    urlImage: { type: String },
    date: { type: Date, default: Date.now }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('users', userSchema);