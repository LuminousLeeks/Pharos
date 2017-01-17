// const bcrypt = require('bcrypt');
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

// to test
// User.hook('afterCreate', 'afterUpdate', (user, subscriptions) => {
//   Category.findAll({
//     where: {
//       id: {
//         in: subscriptions,
//       },
//     },
//   }).then(categories => user.setCategories(categories))
//     .catch((error) => { throw error; });
// });

module.exports = User;


// const User = db.define('user', {
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       is: /^[A-Za-z0-9\\-]+$/i,
//     },
//   },
//   firstName: {
//     type: Sequelize.STRING, //  TODO: confirm
//   },
//   lastName: {
//     type: Sequelize.STRING, //  TODO: confirm
//   },
//   password_digest: {
//     type: Sequelize.STRING,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   password: {
//     type: Sequelize.VIRTUAL,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   password_confirmation: {
//     type: Sequelize.VIRTUAL,
//   },
// }, {
//   freezeTableName: true,
//   indexes: [{
//     unique: true,
//     fields: ['email'],
//   }],
//   instanceMethods: {
//     authenticate: (value) => {
//       if (bcrypt.compareSync(value, this.password_digest)) {
//         return this;
//       } else {
//         return false;
//       }
//     },
//   },
// });

// const hasSecurePassword =  (user, options, callback) => {
//   if (user.password !== user.password_confirmation) {
//     throw new Error("Password confirmation doesn't match Password");
//   }
//   bcrypt.hash(user.get('password'), 10, (err, hash) => {
//     if (err) return callback(err);
//     user.set('password_digest', hash);
//     return callback(null, options);
//   });
// };

// User.beforeCreate((user, options, callback) => {
//   user.email = user.email.toLowerCase();
//   if (user.password) {
//     hasSecurePassword(user, options, callback);
//   }
//   else {
//     return callback(null, options);
//   }
// });

// User.beforeUpdate((user, options, callback) => {
//   user.email.toLowerCase();
//   if (user.password) {
//     hasSecurePassword(user, options, callback);
//   } else {
//     return callback(null, options);
//   }
// });

// module.exports = User;
