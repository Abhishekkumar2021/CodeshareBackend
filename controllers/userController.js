//import model
const User = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse")

const register = async (req,res,next)=>{
    const {username,email,password} = req.body;
    try{
        const user  = await User.create({
            username,email,password
        })
        sendToken(user,res)
        
    }catch(error){
        if(error.code===11000){
            const message = "Email already exist !";
            return next(new ErrorResponse(message,400));
        };
        if(error._message=="user validation failed"){
            const message = "Minimum password length is 6 !";
            return next(new ErrorResponse(message,400));
        }
        next(new ErrorResponse(error._message,400));       
    }
}
const login = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password) next(new ErrorResponse("Please provide email and password !",400));
    try{
        const user  = await User.findOne({
            email
        }).select("+password");
        if(!user) return next(new ErrorResponse("Invalid email address !",400));
        const ismatch  = await user.matchPassword(password);
        if(!ismatch) next(new ErrorResponse("Wrong password !",400));
        else sendToken(user,res)
    }catch(err){
        next(new ErrorResponse(err.message,400));
    }
}

const sendToken = (user,res)=>{
    const token = user.getSignedToken();
    res.status(200).json({success:true,token})
}


module.exports = {
    register,
    login,
}