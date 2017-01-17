const jwtoken = require('jsonwebtoken');
const socketioJwt = require('socketio-jwt');
const bcrypt = require('bcrypt');
const jwtSecret = require('../../env/index').JWT_SECRET;
const User = require('./../../models/User.js');
const insertUser = require('./../../db/utils.js').insertUser;

module.exports.socketAuth = (sockets, cb) => {
  sockets
    .on('connection', socketioJwt.authorize({
      // secret: process.env.JWT_SECRET,
      secret: jwtSecret,
      // handshake: true,
      timeout: 100000, // 10 seconds to send the authentication message
      // callback: false, // disconnect socket server side if invalid token
    }))
    .on('authenticated', (socket) => {

      cb(socket);
    });
};

// HTTP login request
module.exports.loginUser = (request, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  const reqUser = request.body;
  const token = jwtoken.sign(reqUser, jwtSecret, {
    expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 Days
  });

  User.findOne({
    where: {
      username: reqUser.username,
    },
  })
  .then((returnedUser) => {
    if (returnedUser === null) {
      response.status(400).json('User not found');
    }
    if (bcrypt.compareSync(reqUser.password, returnedUser.password)) {
      response.status(200).send({ token, userId: returnedUser.id });
    } else {
      response.status(400).send('Invalid Login');
    }
  })
  .catch((error) => {
    response.status(500).send('An error occured', error);
  });
};

// Register new user, hash password and store salt
module.exports.createUser = (request, response) => {
  const { username, firstName, lastName } = request.body;
  const userPassword = request.body.password;
  // default settings:
  const settings = request.body.settings || {
    radius: 200,
    subscriptions: [1, 2, 3, 4],
  };
  const defaultEmail = 'hello@pharos.com';
  // structure the user
  const user = {
    username,
    firstName,
    lastName,
    password: userPassword,
    email: defaultEmail,
  };

  User.findOne({ where: { username } })
    .then((user) => {
      if(!user) {
        insertUser(user, settings).then((usr) => {
          const userSignature = {
            username: usr.dataValues.username,
            password: usr.dataValues.password,
          };
          const token = jwtoken.sign(userSignature, jwtSecret);
          response.send({ token, userId: usr.dataValues.id });
        });
      } else {
        response.status(404).send('user already exists');
      }
    })
    .catch(() => {
      response.status(500).send('Please try again. Your credentials could not be saved.');
    });
};

//  TODO: create function and tests for
// module.exports.deleteUser = (request, response) => {
  // const deleteUser = req.body;
  // User.findOne({username: deleteUser.username})
  //   .destroy()
// };
