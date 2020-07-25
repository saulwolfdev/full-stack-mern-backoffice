const mongoose=require("mongoose");

const EventSchema=new mongoose.Schema({
	title:String,
	description:String,
	price:String,
	thumbnail:String,
	date:Date,
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	}
})
module.exports=mongoose.model("User",EventSchema);