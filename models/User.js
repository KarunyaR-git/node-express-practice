const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    age: {
        type: Number,
        required: true,
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