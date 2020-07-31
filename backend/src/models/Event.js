const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: String,
	sport:String,
	thumbnail: String,
	date: Date,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}

}, {
	toJSON: {
		virtuals: true
	}

});

EventSchema.virtual("thumbnail_url").get(function(){return `http://localhost:8000/files/${this.thumbnail}`});
// EventSchema.virtual("thumbnail_url").get(()=>{return `http://localhost:8000/files/${this.thumbnail}`});
module.exports = mongoose.model("Event", EventSchema);