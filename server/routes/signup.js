const Model=require("../model/login");
const express=require("express");

const router=express.Router();
router.post("/signup",async (req,res)=>{
  try{
   const {name,email,password}=req.body;
   if(!name ||!email || !password)
   {
    return (400).json({message:"Enter all the fields"});
   }
   const data=new Model({name,email,password});
    const result=await data.save();
    if(result)
    {
      res.status(200).json({message:"Data inserted successfully"});
    }
  }
  catch(err)
  {
    res.status(404).json({message:`Error in the backend signin api ${err}`});
  }
})

module.exports=router;