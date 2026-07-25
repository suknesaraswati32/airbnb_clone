const mongoose=require("mongoose")
const {Schema} = mongoose;
main()
.then(()=>console.log("connection sucessful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relatonDemo');
  
}

const orderSchema=new Schema({
 item:String,
 price:Number,
})

const  cSchema=new Schema({
name:String,
order:[
  {
  type:mongoose.Schema.Types.ObjectId,
  ref:"Order"
}

]


}
)

const Order=mongoose.model("Order",orderSchema)
const Customer=mongoose.model("Custemer",cSchema)
const addC=async()=>{
//   let cus1=new Customer({
//     name:"Rahul Kumar",
//   })
//   let order1=await Order.findOne({item:"chips"})
//   let order1=await Order.findOne({item:"choklet"})
//   cust1.orders.push(order1);
//   cust1.orders.push(order1);

//   let res=await cust1.save()
//   console.log(res)

let result=await Customer.find({})
console.log(result)

}

addC()
// const addOrders=async()=>{
//   let res= await Order.insertMany([
//     {item:"samosa",price:12},
//     {item:"chips",price:20},
//     {item:"choklet",price:10}
//   ]
//   )
//   console.log(res)
// }

// addOrders()

