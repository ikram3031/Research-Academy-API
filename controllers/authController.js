
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils')


const register = async (req, res) => {
    const { email, userName } = req.body;

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
    const { userName, password } = req.body;

    if (!userName || !password) {
        throw new CustomError.BadRequestError('Please provide valid userName and password');
    }

    const user = await User.findOne({ userName });

    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    const tokenUser = {
        userName: user.userName,
        userId: user._id,
        role: user.role
    }

    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}


const logout = async (req, res) => {

    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    res.status(StatusCodes.OK).json({ msg: `user logged out` })

}


module.exports = {
    register, login, logout
}