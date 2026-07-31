const express=require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js")
const Listing=require("../models/listing.js")
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")
router.get("/",wrapAsync(async(req,res)=>{
  let alllistings=await Listing.find({})
  res.render("listings/index", { alllistings })

}))

router.get("/new",isLoggedIn,(req,res)=>{
  res.render("listings/new.ejs")
})
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
 const newListing=new Listing(req.body.listing);
 newListing.owner=req.user._id
 await newListing.save()
 req.flash("success","new listing created")
res.redirect("/listings")
}))
router.get("/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params
  const listing= await Listing.findById(id)
  .populate({path:"reviews",
    populate:{
      path:"author",
    }
  })
  .populate("owner");
  if(!listing){
    req.flash("error","listing you requested for does not exist")
    return res.redirect("/listings")
  }
  res.render("listings/show",{listing})
}))

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async(req,res)=>{
  let {id}=req.params
  const listing=await Listing.findById(id)
  if(!listing){
    req.flash("error","listing you requested for does not exist")
    return res.redirect("/listings")
  }
  res.render("listings/edit",{listing})
}))

router.get("/all", wrapAsync(async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index", { alllistings });
}));

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async(req,res)=>{
    let {id}=req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success","listing updated successfully")
    res.redirect(`/listings/${id}`)
}))


router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndDelete(id)
  req.flash("success","new listing delited")
  res.redirect("/listings")
}))


module.exports=router;