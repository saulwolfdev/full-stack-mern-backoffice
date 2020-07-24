const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");



//settings
const app = express();
const RegisterController = require("./controllers/RegisterController");
//port
const PORT = process.env.PORT || 8000;

//environment
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
app.use(cors());
app.use(express.json());
//middlewares

//routes

app.get("/", (req, res) => {
	res.send("hello man");
});
app.post("/register", RegisterController.store);

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