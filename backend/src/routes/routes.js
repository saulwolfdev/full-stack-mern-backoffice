const express=require("express");
const multer=require("multer");

const UserController = require("../controllers/RegisterController");
const EventController = require("../controllers/EventController");
const DashboardController = require("../controllers/DashboardController");
const uploading=require("../config/upload");

const routes=express.Router();
const upload=multer(uploading);

routes.get("/status", (req, res) => {
	res.send({status:200});
});

//DASHBOARD
routes.get("/dashboard/:sport",DashboardController.getAllEvents);
routes.get("/dashboard",DashboardController.getAllEvents);
routes.get("/event/:eventId",DashboardController.getEventById);
//EVENT
routes.post("/event",upload.single("thumbnail"),EventController.createEvent);
routes.delete("/event/:eventId",EventController.getDeleteEvents);


//USER
routes.post("/user/register",UserController.createUser);
routes.get("/user/:userId",UserController.getUserById);

module.exports=routes;