const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    userName: {
        type: String,
        required: true,
        minlength: 4,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role:{
        type: String,
        enum: [ 'admin', 'user ', 'author' ],
        default: 'user',
    }
})

module.exports = mongoose.model('User', UserSchema)