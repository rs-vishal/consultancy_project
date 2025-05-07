const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  }
});
const Model=mongoose.model("Contact",Schema);
module.exports=Model;