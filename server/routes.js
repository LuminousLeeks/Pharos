const router = require('express').Router()

// const sessions = require('./controllers/restServer/sessions.js');
// const pharosController = require('./controllers/socketServer/pharos.js');

pharosRoute.route('/authenticate')
  .post((req, res) => {
    res.send('received post');
  });

pharosRoute.route('/authenticate')
  .get((req, res) => {
    res.status(200).send('received GET Request');
  });
//  TODO: Build Out Routes
//  set up HTTP Routes
//  set up Socket Routes
module.exports = router

