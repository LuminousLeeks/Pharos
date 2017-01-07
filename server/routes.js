
const router = require('express').Router();


const Sessions = require('./controllers/RESTController/Auth');
const socketController = require('./controllers/SocketController/Socket');

//  User Login Controller
pharosRouter.route('/auth/login')
  .get(Sessions.loginUser);


pharosRoute.route('/authenticate')
  .get((req, res) => {
    res.status(200).send('received GET Request');
  });
//  TODO: Build Out Routes
//  set up HTTP Routes
//  set up Socket Routes
module.exports = router;
