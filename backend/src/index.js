const express=require("express");
const mongoose=require("mongoose")
const cors=require("cors");
const app=express();
const PORT=process.env.PORT||3000;

if(process.env.NODE_ENV!="production"){
	require("dotenv").config();
}
app.use(cors());
app.use(express.json());

app.get("/",(req, res)=>{
	res.send("hello man");
});
try{
	mongoose.connect(process.env.MONGO_DB_CONNECTION,{
		useNewUrlParser:true,
		useUnifiedTopology:true
	})
	console.log("MongoDB CONNECT OK")
}catch(error){
	console.log(error)
}
app.listen(PORT,()=>{
	console.log(`Listening on => ${PORT}`);
})