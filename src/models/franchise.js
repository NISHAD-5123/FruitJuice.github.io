const mongoose = require("mongoose");
const contact=new mongoose.Schema({
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    companyname:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    moreinfo:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    }
});
const franchise= new mongoose.model("franchise",contact);
module.exports=franchise;