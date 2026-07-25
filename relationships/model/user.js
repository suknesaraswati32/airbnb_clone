const mongoose=require("mongoose")
const {Schema} = mongoose;
main()
.then(()=>console.log("connection sucessful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relatonDemo');
  
}

const userSchema=new Schema({
  username:String,
  address:[
         {
          // _id:false,
      location:String,
      city:String,
    },
  ],
})

const User = mongoose.model('User',userSchema)

const addUsers = async()=>{
  let user1=new User({
    username:"shlok",
    address:[
      {
        location:'201 fauji kirana store',
        city:"sukani"
      }
    ]
  })
  user1.address.push({
    location:"kasba-bawda",
    city:"kolhapur"
  })
  let result=await user1.save();
  console.log(result)
}
addUsers()