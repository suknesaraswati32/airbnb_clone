const express = require('express');
const app = express();

app.use((req,res,next)=>{
  let{query}=req.query
  // console.log(query)
  console.log("hi i am middleware")
  return next()
  // res.send("midleware finished")
   console.log("this is after next")
})

app.use((req,res,next)=>{
  console.log("hi i am middleware 2")
  next()

})
app.get("/random",(req,res)=>{
  res.send("This is a random page")
})
app.get("/",(req,res)=>{
  res.send("i am root!")
})
app.listen(8080, () => {
    console.log('Server is running on port 8080');
})