const mongoose = require("mongoose");
const contact=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    }
});
const register= new mongoose.model("register",contact);
module.exports=register;