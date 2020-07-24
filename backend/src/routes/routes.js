const express=require("express");
const UserController = require("../controllers/RegisterController");
const routes=express.Router();


routes.get("/", (req, res) => {
	res.send("Hello from Wolf routes");
});

routes.post("/user/register",UserController.createUser);
// routes.get("/user/:userId",UserController.getUserById);
module.exports=routes;