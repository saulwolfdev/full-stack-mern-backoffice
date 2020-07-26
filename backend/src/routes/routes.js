const express=require("express");
const multer=require("multer");

const UserController = require("../controllers/RegisterController");
const EventController = require("../controllers/EventController");
const uploading=require("../config/upload");

const routes=express.Router();
const upload=multer(uploading);

routes.get("/status", (req, res) => {
	res.send({status:200});
});
//EVENT
routes.get("/event/:eventId",EventController.getEventById);
routes.post("/event",upload.single("thumbnail"),EventController.createEvent);

//USER
routes.post("/user/register",UserController.createUser);
routes.get("/user/:userId",UserController.getUserById);

module.exports=routes;