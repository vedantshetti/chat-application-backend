const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: '',
    },
    gender:{
        type: String,
        enum:["male","female"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export const User = mongoose.model('User', userModel);