const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
const bodyParser=require("body-parser");
app.use(express.json());
const connectDb=require("./config/db")
connectDb();
const rote=require("./routes/route");
app.use("/api",rote);
app.listen(4000 ,()=>{
  console.log("Server is running in the port",process.env.PORT );
})