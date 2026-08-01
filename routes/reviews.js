const express=require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js")
const Review=require("../models/review.js")
const Listing = require("../models/listing.js");
const reviewController=require("../controllers/reviews.js")
const{validatereview,isLoggedIn,isReviewAuthor}=require("../middleware.js")
//reviews post  route
router.post("/",isLoggedIn,
  validatereview,wrapAsync(reviewController.createReview))
//Delete Review route
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync((reviewController.destroyReview)))

module.exports=router;