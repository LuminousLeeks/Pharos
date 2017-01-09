const jwtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = require('../../env/index').JWT_SECRET;
const User = require('./../../models/Models').User;


module.exports.loginUser = (request, response) => {
  const reqUser = request.body;
  const token = jwtoken.sign(reqUser, jwtSecret);

  User.findOne({
    where: {
      username: reqUser.username,
    },
  })
  .then((returnedUser) => {
    if (returnedUser === null) {
      response.status(400).json('User not found');
    } else {
      if (bcrypt.compareSync(reqUser.password, returnedUser.password)) {
        response.status(200).send({ token });
      } else {
        response.status(400).send('Invalid Login');
      }
    }
  })
  .catch((error) => {
    response.status(500).send('An error occured', error);
  });
};

module.exports.createUser = (request, response) => {
  console.log('at the controller');
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
          response.send({ token });
        });
      } else {
        response.redirect('/login');
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
