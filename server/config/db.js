const mongoose=require("mongoose");
require("dotenv").config();
const connectDb =async () =>{
  try {
    await mongoose.connect("mongodb://localhost:27017/consultancy");

  console.log("MongoDb connected successfully");
  } catch (error){
  console.log("Error in connecting MongoDb ",error);
  }
}
module.exports=connectDb;