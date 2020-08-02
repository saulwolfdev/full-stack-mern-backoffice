const express=require("express");
const multer=require("multer");

const UserController = require("../controllers/RegisterController");
const EventController = require("../controllers/EventController");
const DashboardController = require("../controllers/DashboardController");
const LoginController=require("../controllers/LoginController");
const RegistrationController=require("../controllers/RegistrationController");
const uploading=require("../config/upload");

const routes=express.Router();
const upload=multer(uploading);

routes.get("/status", (req, res) => {
	res.send({status:200});
});
//REGISTRATION
routes.post("/registration/:eventId",RegistrationController.create);
routes.get("/registration/:registration_id",RegistrationController.getRegistration);

//LOGIN
routes.post("/login",LoginController.store);

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