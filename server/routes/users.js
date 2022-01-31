const router = require("express").Router();
const {User,validate} = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/",async(req,res)=>{
    try {
        // const {error} = validate(req.body);
        // if(error)
        //     return res.status(400).send({message:error.details[0].message});
        const user=await User.findOne({email:req.body.email});
        if(user)
            return res.status(409).send({message:"User with given Email already exist!"});
        // const salt = await bcrypt.genSalt(Number(process.env.SALT));
        // const hashPassword = await bcrypt.hash(req.body.password,salt);
        // console.log(hashPassword);,pasword:hashPassword
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