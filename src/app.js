const {router}=require("express")
const express=require("express");
const path = require("path");
const hbs=require("hbs");
const console=require("console");
const contactUs = require("./models/contactus");
const franchise = require("./models/franchise");
const register = require("./models/Register");
const login = require("./models/loginform");
const payment = require("./models/payment");

require("./db/conn");
require("./models/loginform");
require("./models/Register");
require("./models/payment");
require("./models/contactus");
require("./models/franchise");

const app=express();
const port=process.env.PORT || 4000;
static_path=path.join(__dirname,"../public");
templates_path=path.join(__dirname,"../templates/views");
partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}));

app.set("view engine", "hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);

// making API's
app.use("/images", express.static("imgs"));

app.get("/",(req, res)=>{
  res.render("index");
});

app.get("/register",(req, res)=>{
    res.render("register");
});

app.get("/menus",(req, res)=>{
  res.render("menus");
});

app.get("/services",(req, res)=>{
  res.render("services");
});

app.get("/franchise",(req, res)=>{
  res.render("franchise");
});

app.get("/ContactUs",(req, res)=>{
  res.render("ContactUs");
});

app.get("/login",(req, res)=>{
  res.render("login");
});

app.get("/payment",(req, res)=>{
  res.render("payment");
});

app.listen(port,()=>{
console.log(`server is running on ${port}`);
});

app.post("/register", async(req,res)=>{
     try{
        const password = req.body.password
        const cpassword = req.body.cpassword

         if(password===cpassword){
    const contactRegister= new register({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    cpassword:req.body.cpassword,
  })
  const contacted= await contactRegister.save();
  res.status(201).render("registerSuccess");
}
         else{
            res.render("invalidpages");
        }
 }catch(error){
         res.send(error);
     }
});


app.post("/login", async(req,res)=>{
  try{
     const email = req.body.email
     const password = req.body.password
    let userdata= await register.findOne({email:email});
    
      if(userdata.password===password){
 const contactLogin= new login({
 email:req.body.email,
 password:req.body.password,
});
const contacted= await contactLogin.save();
res.status(201).render("loginSuccess");
}
      else{
         res.render("invalidpages");
     }
}catch(e){
      res.render("invalidpages");
  }
});


app.post("/payment", async(req,res)=>{
     try{
        const password = req.body.password
        const email = req.body.email
        let userdata = await register.findOne({email:email});
         if((userdata.password === password)){
    const contactPayment= new payment({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    cvv:req.body.cvv,
    amount:req.body.amount,
    expiryDate:req.body.expiryDate,
    cardNumber:req.body.cardNumber,
  })
  const contacted= await contactPayment.save();
  res.status(201).render("paymentSuccess");
}
         else{
            res.render("invalidpages");
        }
 }catch(error){
         res.send(error);
     }
});

app.post("/ContactUs", async(req,res)=>{
 const contactUS= new contactUs({
 name:req.body.name,
 email:req.body.email,
 subject:req.body.subject,
 message:req.body.message,
});
const contacted= await contactUS.save();
res.status(201).render("contactSuccess");
});

app.post("/franchise", async(req,res)=>{
  const contactfranchise= new franchise({
  fname:req.body.fname,
  lname:req.body.lname,
  email:req.body.email,
  address:req.body.address,
  phone:req.body.phone,
  moreinfo:req.body.moreinfo,
  companyname:req.body.companyname,
  
 });
 const contacted= await contactfranchise.save();
 res.status(201).render("franchiseSuccess");
 });

 app.get("/search", async(req,res)=>{
     try {
      const name = req.query.name
      const email = req.query.email

      const searchData = await register.find({
        "$or" : [
          {
            name : {
              $regex : req.query.name , $options : "i"
            },
            email : {
               $regex : req.query.email , $options : "i"
             }
          }
        ]
      });
      if(searchData.length > 0){
      res.send(searchData);
      }
      else{
        res.send("data not found");
      }
  
    } catch (error) {
    res.send(error);
      }
 });