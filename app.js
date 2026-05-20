const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const path=require("path")

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main().then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
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
app.get("/listings/:id",async(req,res)=>{
  let {id}=req.params
  let listing= await Listing.findById(id)
  res.render("listings/show",{listing})
})
app.listen(8080,()=>{
  console.log("server is running on port 8080")
})