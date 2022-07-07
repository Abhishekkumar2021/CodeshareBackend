const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const ErrorResponse = require("../utils/ErrorResponse")

const protect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new ErrorResponse("Not authorised to this route !",401))
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET);
        const user = await  User.findById(decoded.id);
        if(!user) return next(new ErrorResponse("No user found with !"))
        req.user = user
        next();

    }catch(err){
        next(new ErrorResponse("Not authorized to acces this route",401));
    }
}

module.exports = protect