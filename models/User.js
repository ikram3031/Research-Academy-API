const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 20,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    userName: {
        type: String,
        required: true,
        minlength: 4,
    },
    phoneNo: {
        type: String,
        required: false,
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
    role: {
        type: String,
        enum: ['admin', 'user ', 'author'],
        default: 'user',
    },
    image: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
},
    {
        versionKey: false,
        timestamps: true,
    },
);

module.exports = mongoose.model('User', UserSchema)