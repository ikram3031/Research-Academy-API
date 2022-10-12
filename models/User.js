const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        maxlength: 20,
    },
    lastName: {
        type: String,
        required: false,
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
        required: true,
    },
    email: {
        type: String,
        unique: true,
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
        enum: ['admin', 'user', 'author'],
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

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match Hased password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema)