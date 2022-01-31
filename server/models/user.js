const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const { text } = require("stream/consumers");
const bcrypt = require("bcrypt");




const userSchema = new mongoose.Schema({

    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}

});
userSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this.id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
};
const User= mongoose.model("user",userSchema);

const validate =(data)=>{
    const schema=joi.object({

        firstName:joi.string().required().label("First Name"),
        lastName:joi.string().required().label("Last Name"),
        email:joi.string().email.required().label("Email"),
        password:passwordComplexity.required().label("Password")
        
    });
    return schema.validate(data)
};

module.exports = {User,validate};