const express=require("express")
const router=express.Router()

router.get("/",(req,res)=>{
  res.send("get for users")
})
router.get("/:id",(req,res)=>{
  res.send("get for  show users")
})
router.post("/",(req,res)=>{
  res.send("get for  post  users")
})

router.delete("/:id",(req,res)=>{
  res.send("DELETE for user id")
})

module.exports= router;

