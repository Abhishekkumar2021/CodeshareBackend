const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const private = async (req,res)=>{
    res.status(200).json({success:true,user:req.user})
}

module.exports = private;