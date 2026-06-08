const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    email: {
        type: String,               
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    role: {
        type: String,
        default: 'user',
        lowercase: true,
        trim: true,
        enum: ['user', 'admin', 'doctor'],
        required: true
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;