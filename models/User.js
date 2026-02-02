const mongoose=require("mongoose")
const schema=new mongoose.Schema({
    uId:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model("users",schema)