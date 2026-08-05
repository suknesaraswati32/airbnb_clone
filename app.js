if(process.env.NODE_ENV!=="production"){
  require('dotenv').config()
}
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const methodOverride = require('method-override')
const ejsMate=require("ejs-mate")
const listingRouter=require("./routes/listing.js")
const reviewRouter=require("./routes/reviews.js")
const userRouter=require("./routes/user.js")
const { error } = require("console")
const ExpressError=require("./utils/ExpressError.js")
const Listing=require("./models/listing.js")
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport")
const LocalStrategy = require("passport-local");
const User=require("./models/user.js")
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main()
.then(() =>
   console.log("Connected to MongoDB"))
.catch(err => 
  console.log(err));
app.set("view engine","ejs") 
app.set("views",path.join(__dirname,"views"))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
const sessionoptions={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxage:7*24*60*60*1000,
    httpOnly:true,
  }
}
app.use(session(sessionoptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
res.locals.success=req.flash("success")
res.locals.error=req.flash("error")
res.locals.currUser=req.user
next()
})
app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)
app.engine("ejs",ejsMate)
async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.get("/demouser",async(req,res)=>{
//   let fakeUser=new User({
//     email:"stuldent@gmail.com",
//     username:"delta-student"
//   })
//  let registereduser= await User.register(fakeUser,"helloworld")
//  res.send(registereduser)
// })


// app.get("/listings",async(req,res)=>{
//   let sampleListing=new Listing({
//     title:"new palace",
//     description:"a beautiful palace in the heart of the city",
//     price:500000,
//     location:"Kolhapur,Maharashtra",
//     country:"India"
// //   })
//   await sampleListing.save()
//   console.log("listing was saved")
//   res.send("Listing created")
// })


// app.all("/",(req,res,next)=>{
//   next(new ExpressError(404,"page not found"))
// })

//middleware for error handling
// app.use((err,req,res,next)=>{
//   let {statusCode=500,message="something went wrong"}=err;
// //  res.status(statusCode).send(message)
// res.status(statusCode).render("listings/error.ejs",{err})
// })


app.use((err, req, res, next) => {
    console.log("\n========== ERROR ==========");
    console.log("URL:", req.originalUrl);
    console.log("Method:", req.method);
    console.log("Error Name:", err.name);
    console.log("Message:", err.message);
    console.log("Stack:\n", err.stack);
    console.log("===========================\n");

    res.status(err.status || 500).send(err.message);
});

//use the port no 8080
app.listen(8080,()=>{
  console.log("server is running on port 8080")
})