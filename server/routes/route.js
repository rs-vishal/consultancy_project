const express=require("express");
const router=express.Router();
const Model=require("../model/model");
router.post("/add",async (req,res)=>{
    try{
      const {name,email,phone,message}=req.body;
      if(!name || !email || !phone || !message)
      {
        return res.status(400).json({message:"Please fill all the fields"});
      }
      const d=new Model({name,email,phone,message});
      d.save();
      res.status(200).json({message:"Dtaas inserted succesfully"});
    }
    catch(err)
    {
      console.log("Error at the backend post api",err);
      res.status(404).json({message:"The data is not found"});
    }
})
router.get("/",async (req,res)=>{
  try{
    const data=await Model.find();
    console.log("Data in the backend",data);
    res.status(200).json(data);
  }
  catch(err)
  {
    console.log("Error at the get api",err);
    res.ststus(404).json({message:"Error in the backend get method"});
  }

})
module.exports=router;