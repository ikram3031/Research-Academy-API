

const getAllUsers = async(req,res) => {
    res.send(`get all users`);
}

const getSingleUser = async(req,res) => {
    res.send(`getSingleUser`);
}

const showCurrentUser = async(req,res) => {
    res.send(`showCurrentUser`);
}

const updateUser = async(req,res) => {
    res.send(`updateSingleUser`);
}

const updateUserPassword = async(req,res) => {
    res.send(`updateUserPassword`);
}

module.exports = {
    getAllUsers, 
    getSingleUser, 
    showCurrentUser, 
    updateUser, 
    updateUserPassword
}