const express = require('express');
const multer = require('multer');

const verifyToken = require('../config/verifyToken');

const UserController = require('../controllers/UserController');
const EventController = require('../controllers/EventController');
const DashboardController = require('../controllers/DashboardController');
const LoginController = require('../controllers/LoginController');
const RegistrationController = require('../controllers/RegistrationController');
const ApprovalsController = require('../controllers/ApprovalsController');
const RejectionsController = require('../controllers/RejectionsController');
const uploading = require('../config/upload');

const routes = express.Router();
const upload = multer(uploading);

routes.get('/status', (req, res) => {
  res.send({ status: 200 });
});
//REGISTRATION
routes.post('/registration/:eventId', RegistrationController.create);
routes.get(
  '/registration/:registration_id',
  RegistrationController.getRegistration
);
routes.post(
  '/registration/:registration_id/approvals',
  ApprovalsController.approvals
);
routes.post(
  '/registration/:registration_id/rejections',
  RejectionsController.rejections
);

//LOGIN
routes.post('/login', LoginController.store);

//DASHBOARD
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents);
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents);
routes.get('/user/events', verifyToken, DashboardController.getEventByUserId);
routes.get('/event/:eventId', verifyToken, DashboardController.getEventById);

//EVENT
routes.post(
  '/event',
  verifyToken,
  upload.single('thumbnail'),
  EventController.createEvent
);
routes.delete('/event/:eventId', verifyToken, EventController.getDeleteEvents);

//USER
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;
