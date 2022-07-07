const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    author:{
        type:String,
        required:true
    },
    upvotes:{
        type:Number,
        default:0
    },
    email:{
        type:String,
        default:"Codeshare@mail.com"
    }
   
},{timestamps:true});

module.exports = mongoose.model('post',postSchema);