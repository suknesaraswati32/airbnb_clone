const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  description: String,

  image: {
    filename: {
      type: String,
      default: "listingimage"
    },

    url: {
      type: String,

      default:
        "https://images.rawpixel.com/image_png_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xOV9tb2Rlcm5faG91c2VfaXNvbGF0ZWRfb25fd2hpdGVfYmFja2dyb3VuZF9lOTdkNjgxZC1mN2U1LTRmMjUtYTllYi1mNjJlOWJlN2U3ZDIucG5n.png",

      set: (v) =>
        v === ""
          ? "https://images.rawpixel.com/image_png_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xOV9tb2Rlcm5faG91c2VfaXNvbGF0ZWRfb25fd2hpdGVfYmFja2dyb3VuZF9lOTdkNjgxZC1mN2U1LTRmMjUtYTllYi1mNjJlOWJlN2U3ZDIucG5n.png"
          : v
    }
  },

  price: Number,
  location: String,
  country: String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;