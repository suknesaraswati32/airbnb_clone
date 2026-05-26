const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const path=require("path")
const methodOverride = require('method-override')
const ejsMate=require("ejs-mate")
const { error } = require("console")
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema}=require("./schema.js")
const wrapAsync=require("./utils/wrapAsync.js")
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main().then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));
app.set("view engine","ejs") 
app.set("views",path.join(__dirname,"views"))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
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


const validateListing=(req,res,next)=>{
  let(error)=listingSchema.validate(req.body)

if(error){
  let errMsg=error.details.map((el)=>el.message).join(",")
  throw new ExpressError(400,errMsg);
}else{
  next()
}
}

app.get("/listings",wrapAsync(async(req,res)=>{
  let alllistings=await Listing.find({})
  res.render("listings/index", { alllistings })

}))

app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs")
})
app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
//  if(!req.body.listing){
//   throw new ExpressError(400,"send valid data for listing")
//  } 
 const newListing=new Listing(req.body.listing);
 await newListing.save()
res.redirect("/listings")
}))
app.get("/listings/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params
  const listing= await Listing.findById(id)
  res.render("listings/show",{listing})
}))

app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
  let {id}=req.params
  const listing=await Listing.findById(id)
  res.render("listings/edit",{listing})
}))

app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
let {id}=req.params
await Listing.findByIdAndUpdate(id,{...req.body.listing})
res.redirect(`/listings/${id}`)
}))


app.delete("/listings/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndDelete(id)
  res.redirect("/listings")
}))

app.all("/",(req,res,next)=>{
  next(new ExpressError(404,"page not found"))
})

app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong"}=err;
//  res.status(statusCode).send(message)
res.status(statusCode).render("listings/error.ejs",{err})
})


app.listen(8080,()=>{
  console.log("server is running on port 8080")
})