const authController = require('../controllers/auth');
const router = require('express').Router();
const socketController = require('./../controllers/socket');
const { io } = require('./../server.js');

 // User Login Controller
router.post('/auth/login', authController.loginUser);

 // New User Controller
router.post('/auth/signup', authController.createUser);

// Admin Use - List of all users
// router.get('/users', authController.getUsers);

// Socket Server Router // //  TODO: DETERMINE IF NECESSARY WHEN SOCKET AUTH SET UP W CLIENT
socketController(io.of('/socket'));

module.exports = router;
