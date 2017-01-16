const jwtoken = require('jsonwebtoken');
const socketioJwt = require('socketio-jwt');
const bcrypt = require('bcrypt');
const jwtSecret = require('../../env/index').JWT_SECRET;
const User = require('./../../models/User.js');

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

// Authentication JwToken passed from socket
// module.exports.socketAuth = (socket, callback) => {
//   socket
//     .on('connect', socketioJwt.authorize({
//       secret: jwtSecret,
//       timeout: 10000,
//     }))
//     .on('authenticated', (socket2) => {
//       callback(socket2);
//     });
// };


// HTTP login request
module.exports.loginUser = (request, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  const reqUser = request.body;
  const token = jwtoken.sign(reqUser, jwtSecret, {
    expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 Days
  });
  // TODO: get userId from database
  const userId = (123456789).toString();

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
      response.status(200).send({ token, userId });
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
  const username = request.body.username;
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const userPassword = request.body.password;
// Generate a salt
  const userSalt = bcrypt.genSaltSync(10);
// Hash  password with  salt
  const userHash = bcrypt.hashSync(userPassword, userSalt);

  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        User.create({
          username,
          firstName,
          lastName,
          password: userHash,
          salt: userSalt,
        })
        .then((usr) => {
          // refactor below to utils
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
