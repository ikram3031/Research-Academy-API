const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users });
}

const getSingleUser = async (req, res) => {
    const user = await User.find({ role: 'user' }).select('-passsword');
    if (!user) {
        throw new CustomError.NotFoundError(`No user with if: ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ user });
}

const showCurrentUser = async (req, res) => {
    res.send(`showCurrentUser`);
}

const updateUser = async (req, res) => {
    res.send(`updateSingleUser`);
}

const updateUserPassword = async (req, res) => {
    res.send(`updateUserPassword`);
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}