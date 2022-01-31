const {User} = require("../models/user");

// deleting data of user from the database
const deleteUser  = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        console.log(error.message);
        response.status(409).json({ message: error.message});     
    }
};

module.exports = deleteUser;