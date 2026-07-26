const express=require("express")
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const methodOverride = require('method-override')
const ejsMate=require("ejs-mate")
const listings=require("./routes/listing.js")
const reviews=require("./routes/reviews.js")
const { error } = require("console")
const ExpressError=require("./utils/ExpressError.js")
const Listing=require("./models/listing.js")
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
app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)
app.engine("ejs",ejsMate)
async function main() {
  await mongoose.connect(MONGO_URL);
}

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


app.all("/",(req,res,next)=>{
  next(new ExpressError(404,"page not found"))
})

//middleware for error handling
app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong"}=err;
//  res.status(statusCode).send(message)
res.status(statusCode).render("listings/error.ejs",{err})
})
//use the port no 8080
app.listen(8080,()=>{
  console.log("server is running on port 8080")
})