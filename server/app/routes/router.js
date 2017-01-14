const router = require('express').Router();
const authController = require('../controllers/auth');
const socketController = require('../controllers/socket');

const { io } = require('../server.js');

// User Login Controller
router.post('/auth/login', authController.loginUser);

// New User Controller
router.post('/auth/signup', authController.createUser);

socketController(io.of('/socket'));

// Admin Use - List of all users
// router.get('/users', authController.getUsers);


module.exports = router;
