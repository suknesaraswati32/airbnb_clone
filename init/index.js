const mongoose=require("mongoose")
const initdata=require("./data.js")
const Listing=require("../models/listing.js")

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
const dbUrl=process.env.ATLASDB_URL;
main().then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async ()=>{
  await Listing.deleteMany({});
  initdata.data=initdata.data.map((obj)=>({...obj,
    owner:"6a6b43466a0bb3da4e6b124d" 
  }))
  await Listing.insertMany(initdata.data);
  console.log("data was initalize")
}

initDB();