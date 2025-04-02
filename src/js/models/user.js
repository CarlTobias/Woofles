const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true, 
        unique: true, 
        min: 3, 
        max: 50
    }, 
    email: {
        type: String, 
        require: true, 
        unique: true
    }, 
    password: {
        type: String,
        require: true,
        unique: true,
        min: 5
    }, 
    profilePicture: {
        type: String, 
        default: ""
    }, 
    followers: {
        type: Array, 
        default: []
    }, 
    following: {
        type: Array,
        default: []
    }, 
    isAdmin: {
        type: Boolean, 
        default: false
    }, 
    desc: {
        type: String, 
        max: 50
    }
}, {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);