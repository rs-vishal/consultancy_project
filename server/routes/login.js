const Model=require("../model/login");
const express=require("express");

const router=express.Router();
router.get("/login",async (req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password)
    {
      return res.status(400).json({message:"Please fill all the fields"});
    }
    const data=await Model.findOne({email:email});
    if(data)
    {
      if(data.password===password)
      {
        res.status(200).json({message:"Login successful"});
      }
      else
      {
        res.status(400).json({message:"Invalid credentials"});
      }
    }
    else
    {
      res.status(400).json({message:"User not found"});
    }
  }
  catch(err)
  {
    console.log("Eroor in the backend login api",err);
    res.status(404).json({message:"Error in the backend login api"});
  }
})

module.exports=router;