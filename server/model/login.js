const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
  email:{type:String,require:true},
  password:{type:String,require:true},
  mobile:{type:String,require:true}
}
)
const Model=mongoose.model("Login",Schema);
module.exports=Model;