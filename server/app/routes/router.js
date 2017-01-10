const authController = require('../controllers/auth');
const router = require('express').Router();
const { ioListener } = require('./../server');
const { pharosController } = require('./../controllers/socket');
// console.log(ioListener, 'io listening///////////////////////');
 // User Login Controller
router.post('/auth/login', authController.loginUser);

 // New User Controller
router.post('/auth/register', authController.createUser);

// Admin Use - List of all users
// router.get('/users', authController.getUsers);

// Socket Server Router
pharosController(ioListener.of('/pharos'));

module.exports = router;
