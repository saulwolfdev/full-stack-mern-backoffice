const express = require("express");
const mongoose = require("mongoose");
const routes=require("./routes/routes");
const cors = require("cors");

//settings
const app = express();

//port
const PORT = process.env.PORT || 8000;

//environment
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
app.use(cors());
app.use(express.json());

//routes
app.use(routes);
//database
try {
	mongoose.connect(process.env.MONGO_DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("MongoDB CONNECT OK");
} catch (error) {
	console.log(error);
}
app.listen(PORT, () => {
	console.log(`Listening on => ${PORT}`);
})