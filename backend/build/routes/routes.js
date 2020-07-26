"use strict";

const express = require("express");

const UserController = require("../controllers/RegisterController");

const EventController = require("../controllers/EventController");

const routes = express.Router();
routes.get("/status", (req, res) => {
  res.send({
    status: 200
  });
});
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);
module.exports = routes;