const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
  name:{type:String,require:true},
  email:{type:String,require:true},
  password:{type:String,require:true}
}
)
const Model=mongoose.model("Signup",Schema);
module.exports=Model;