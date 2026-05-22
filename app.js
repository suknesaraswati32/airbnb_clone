const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const path=require("path")
const methodOverride = require('method-override')
const ejsMate=require("ejs-mate")
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
app.get("/",(req,res)=>{
  res.send("Hello World")
})
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

app.get("/listings/all",async(req,res)=>{
  let alllistings=await Listing.find({})
  res.render("listings/index", { alllistings })
})

app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs")
})
app.post("/listings",async(req,res)=>{
 const newListing=new Listing(req.body.listing);
 await newListing.save()
res.redirect("/listings/all")


})
app.get("/listings/:id",async(req,res)=>{
  let {id}=req.params
  const listing= await Listing.findById(id)
  res.render("listings/show",{listing})
})

app.get("/listings/:id/edit",async(req,res)=>{
  let {id}=req.params
  const listing=await Listing.findById(id)
  res.render("listings/edit",{listing})
})

app.put("/listings/:id",async(req,res)=>{
let {id}=req.params
await Listing.findByIdAndUpdate(id,{...req.body.listing})
res.redirect(`/listings/${id}`)
})


app.delete("/listings/:id",async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndDelete(id)
  res.redirect("/listings/all")
})
app.listen(8080,()=>{
  console.log("server is running on port 8080")
})