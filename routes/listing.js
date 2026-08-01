const express=require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js")
const Listing=require("../models/listing.js")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listing.js")
router
.route("/")
.get(wrapAsync(listingController.index))
// .post(isLoggedIn,validateListing,wrapAsync(listingController.createListing))
.post(upload.single('listing[image]'),(req,res)=>{
  res.send(req.file)
})

router.get("/new",isLoggedIn,listingController.rendernewform)


router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing))
.delete(isLoggedIn,
  isOwner,
  wrapAsync(listingController.distroyListing))


router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm))

module.exports=router;