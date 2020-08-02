const express = require("express");
const mongoose = require("mongoose");
const routes=require("./routes/routes");
const path=require("path");
const cors = require("cors");

//settings
const app = express();

//port
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//environment
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

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

//static
app.use("/files",express.static(path.resolve(__dirname,"..","files")));

//routes
app.use(routes);

app.listen(PORT, () => {
	console.log(`Listening on => ${PORT}`);
})