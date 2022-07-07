const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"]
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true,
        match:[ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please provide correct email address"]
    },
    password:{
        type:String,
        required:[true, "Please provide a password"],
        minLength:6,
        select:false
    },
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id},process.env.SECRET,{expiresIn:process.env.EXPIRE})
}

module.exports = mongoose.model('user',userSchema);