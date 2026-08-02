const Listing=require("../models/listing.js")
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
    const newListing = new Listing(req.body.listing);

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
  res.render("listings/edit",{listing})
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success","listing updated successfully")
    res.redirect(`/listings/${id}`)
}

module.exports.distroyListing=async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndDelete(id)
  req.flash("success","new listing delited")
  res.redirect("/listings")
}