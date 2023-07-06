const mongoose = require("mongoose");
const contact=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
});
const contactUs= new mongoose.model("contactUs",contact);
module.exports=contactUs;