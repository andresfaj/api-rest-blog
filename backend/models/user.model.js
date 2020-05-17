const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'A name is required'] },
    lastName: { type: String, required: [true, 'A LastName is required'] },
    role: { type: String, default: 'USER_ROLE', enum: validRoles },
    email: { type: String, unique: true, required: [true, 'An email is required'] },
    password: { type: String, required: [true, 'A password is required'] },
    urlImage: { type: String },
    activeUser: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
});

userSchema.methods.encryptPassword = async(password) => {
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = bcrypt.hash(password, salt);
    return hash;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('users', userSchema);