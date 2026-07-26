const express=require("express")
const app=express()
const posts=require("./routes/post.js")
const users=require("./routes/user.js")
const cookieParser=require("cookie-parser")
app.use(cookieParser("secretecode"))
app.get("/getcookies",(req,res)=>{
  res.cookie("greet","hello")
  res.cookie("madein","india")
  res.send("send you some cookies")
})
app.get("/getssignerdcookie",(req,res)=>{
  res.cookie("made-in","India",{signed:true})
res.send("signed cookie sent")
})
app.get("/verify",(req,res)=>{
  console.log(req.signedCookies)
  res.send("verified")
})
app.get("/greet",(req,res)=>{
  let {name="anonymous"}=req.cookies
  res.send(`hi ${name}`)
})
app.use("/users",users)
app.use("/posts",posts)
app.get("/",(req,res)=>{
  res.send("this is root route")
  console.log(req.cookies)
})

app.listen(3000,()=>{
  console.log("app is listening on port 3000")
})