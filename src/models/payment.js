const mongoose = require("mongoose");
const contact=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cardNumber:{
        type:Number,
        required:true,
    },
    cvv:{
        type:Number,
        required:true,
    },
    expiryDate:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    }
});
const payment= new mongoose.model("payment",contact);
module.exports=payment;