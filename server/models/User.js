const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../db/db.js');
// const Category = require('./Category.js');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   is: /^[A-Za-z0-9\\-]+$/i,
    // },
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  radius: {
    type: Sequelize.INTEGER,
  },
});

// Hooks:

const hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(user.password, salt);
  user.salt = salt;
  user.password = password;
};

// not firing:
User.hook('beforeUpdate', (user) => {
  return hashPassword(user);
});

User.hook('beforeCreate', (user) => {
  return hashPassword(user);
});

module.exports = User;

