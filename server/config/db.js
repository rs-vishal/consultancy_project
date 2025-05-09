const mongoose=require("mongoose");
require("dotenv").config();
const connectDb =async () =>{
  try {
    await mongoose.connect("mongodb+srv://vishal:vishal2004@cluster0.7hi3hm6.mongodb.net/consultancy");

  console.log("MongoDb connected successfully");
  } catch (error){
  console.log("Error in connecting MongoDb ",error);
  }
}
module.exports=connectDb;