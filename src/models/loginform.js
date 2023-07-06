const mongoose = require("mongoose");
const contact=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});
const login= new mongoose.model("login",contact);
module.exports=login;