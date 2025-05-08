const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
const bodyParser=require("body-parser");
app.use(express.json());
const connectDb=require("./config/db")
connectDb();
const rote=require("./routes/route");
app.use("/api/contact",rote);
const login=require("./routes/login");
app.use("/api",login);
const signup=require("./routes/signup");
app.use("/api",signup);
const stats=require("./routes/stats");
app.use("/api",stats);
app.listen(4000 ,()=>{
  console.log("Server is running in the port",process.env.PORT );
})