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
    if (bcrypt.compareSync(reqUser.password, returnedUser.password + returnedUser.salt)) {
      response.status(200).json({ token });
    } else {
      response.status(400).json('Invalid Login');
    }
  })
  .catch((error) => {
    response.status(500).json('An error occured', error);
  });
};


module.exports.createUser = (request, response) => {
  const newUser = request.body;
  const username = request.body.username;
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const userPassword = request.body.password;
// Generate a salt
  const userSalt = bcrypt.genSaltSync(10);
// Hash  password with  salt
  const userHash = bcrypt.hashSync(userPassword, userSalt);

  User.findOne({ where: { username: newUser.username } })
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
          const token = jwtoken.sign(usr, jwtSecret);
          response.status(200).json({ token });
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
