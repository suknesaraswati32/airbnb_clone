const express=require("express")
const app=express()
const posts=require("./routes/post.js")
const users=require("./routes/user.js")
const session=require("express-session")
const flash=require("connect-flash")
const path=require("path")
app.set("view engine","ejs") 
app.set("views",path.join(__dirname,"views"))
const sessionoptions={
  secret: "mysupersecretstring",
  resave:false,
  saveUninitialized:true
}
app.use(session(sessionoptions))
app.use(flash())
app.use((req,res,next)=>{
    res.locals.successmsg=req.flash("success")
    res.locals.errormsg=req.flash("error")
    next()
})

app.get("/test",(req,res)=>{
  res.send("test successful")
})

app.get("/register",(req,res)=>{
  let {name = "anonymous"}=req.query;
req.session.name=name;
if(name ==="anonymous"){
  req.flash("error","user not occured")
}
else{
req.flash("success","user registered successfully")
}
res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
  res.render("page.ejs",{name:req.session.name})
})

// app.get("/reqcount",(req,res)=>{
//   if(req.session.count){
//     req.session.count++;
//   }else{
//     req.session.count=1;
//   }
//   req.session.count=1;
//   res.send(`you send a request ${req.session.count} times`)
// })
// const cookieParser=require("cookie-parser")
// app.use(cookieParser("secretecode"))
// app.get("/getcookies",(req,res)=>{
//   res.cookie("greet","hello")
//   res.cookie("madein","india")
//   res.send("send you some cookies")
// })
// app.get("/getssignerdcookie",(req,res)=>{
//   res.cookie("made-in","India",{signed:true})
// res.send("signed cookie sent")
// })
// app.get("/verify",(req,res)=>{
//   console.log(req.signedCookies)
//   res.send("verified")
// })
// app.get("/greet",(req,res)=>{
//   let {name="anonymous"}=req.cookies
//   res.send(`hi ${name}`)
// })
// app.use("/users",users)
// app.use("/posts",posts)
// app.get("/",(req,res)=>{
//   res.send("this is root route")
//   console.log(req.cookies)
// })



app.listen(3000,()=>{
  console.log("app is listening on port 3000")
})