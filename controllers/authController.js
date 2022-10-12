
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils')


const register = async (req, res) => {
    const { email, userName, password } = req.body;

    // Check if email already exists
    const emailAlreadyExists = await User.findOne({ email })

    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists')
    }

    // check if userName already exists
    const userNameExists = await User.findOne({ userName })

    if (userNameExists) {
        throw new CustomError.BadRequestError('User Name Already Exists')
    }

    const user = await User.create(req.body);

    const tokenUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        userId: user._id,
        phoneNo: user.phoneNo
    }

    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}

const login = async (req, res) => {
    res.send('login');
}

const logout = async (req, res) => {
    res.send('logout');
}

module.exports = {
    register, login, logout
}