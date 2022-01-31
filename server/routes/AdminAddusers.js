const router = require("express").Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/",async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(user)
            return res.status(409).send({message:"User with given Email already exist!"});
        const storeData = await new User(req.body).save();
        console.log("User Data Stored in DataBase");
        console.log(storeData);
        const b=res.status(201).send({message:"User Created Successfully"});

    } catch (error) {
        console.log("Error: ",error.message);
        res.status(500).send({message:"Internal Server Error....."});
        
    }
})

module.exports = router;