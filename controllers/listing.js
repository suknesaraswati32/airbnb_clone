
const Listing=require("../models/listing.js")
const axios = require("axios");
module.exports.index=async(req,res)=>{
  let alllistings=await Listing.find({})
  res.render("listings/index", { alllistings })

}

module.exports.rendernewform=(req,res)=>{
  res.render("listings/new.ejs")
}

module.exports.showListing=async(req,res)=>{
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
}

module.exports.createListing = async (req, res, next) => {

   const location = req.body.listing.location;

  const apiKey = "7224f5b6dd644c47b5542e51a2a58f87";

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${apiKey}`;
  const response = await axios.get(url);
  const coordinates = response.data.features[0].geometry.coordinates;

    const newListing = new Listing(req.body.listing);
      newListing.geometry = {
    type: "Point",
    coordinates: coordinates
};
    newListing.owner = req.user._id;

    newListing.images = req.files.map(file => ({
        filename: file.filename,
        url: file.path
    }));

    await newListing.save();

    req.flash("success", "New Listing Created!");

    res.redirect("/listings");
};

module.exports.renderEditForm=async(req,res)=>{
  let {id}=req.params
  const listing=await Listing.findById(id)
  if(!listing){
    req.flash("error","listing you requested for does not exist")
    return res.redirect("/listings")
  }
  let originalImageUrl=listing.images[0].url;
  originalImageUrl=originalImageUrl.replace("/upload/w_250", "")
  res.render("listings/edit",{listing,originalImageUrl})
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing},{new:true})
    if (req.files && req.files.length >0){
        listing.images= req.files.map(file => ({
        filename: file.filename,
        url: file.path
    }));
      await listing.save();
    }
    req.flash("success","listing updated successfully")
    res.redirect(`/listings/${id}`)
}

module.exports.distroyListing=async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndDelete(id)
  req.flash("success","new listing delited")
  res.redirect("/listings")
}