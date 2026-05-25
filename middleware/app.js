const express = require('express');
const app = express();

// app.use((req,res,next)=>{
//   let{query}=req.query
//   // console.log(query)
//   console.log("hi i am middleware")
//   return next()
//   // res.send("midleware finished")
//    console.log("this is after next")
// })

app.use((req,res,next)=>{
  req.time=new Date(Date.now()).toLocaleTimeString()
  console.log(req.method,req.hostname,req.path,req.time)
  next()
})

app.use("/random",(req,res,next)=>{
  console.log("hi i am only for random")
  next()
})
// app.use((req,res,next)=>{
//   console.log("hi i am middleware 2")
//   next()

// })

const checkToken=(req,res,next)=>{
let {token}=req.query
if(token==="giveaccess"){
  next()
}
throw new Error("Access Denied")
}
app.get("/api",checkToken,(req,res)=>{
  res.send("data")
})

app.get("/wrong",(req,res)=>{
  abcd=abcd
})
app.get("/random",(req,res)=>{
  res.send("This is a random page")
})
app.get("/",(req,res)=>{
  res.send("i am root!")
})

app.use((req,res)=>{
  res.status(404).send("Not Found")
})
app.listen(8080, () => {
    console.log('Server is running on port 8080');
})