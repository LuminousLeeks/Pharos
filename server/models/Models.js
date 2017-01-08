const Sequelize = require('sequelize');
const db = require('../db/db.js');

//  TODO: break each model out into individual files

const Models = {
  User: db.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[A-Za-z0-9\\-]+$/i,
      },
    },
    firstName: {
      type: Sequelize.STRING, //  TODO: confirm
    },
    lastName: {
      type: Sequelize.STRING, //  TODO: confirm
    },
    password: {
      type: Sequelize.STRING, // TODO: ADD PASSWORD CONFIRMATION
    },
    salt: {
      type: Sequelize.STRING, //SALT
    },
  }),

  Category: db.define('category', {
    name: Sequelize.STRING,
  }, { timestamps: false }),

  Notification: db.define('notification', {
    text: Sequelize.STRING,
    location: Sequelize.GEOGRAPHY,
    vote_count: Sequelize.INTEGER,
  }),
};

// Define relationships:
Models.User.hasMany(Models.Notification, { as: 'Notifications' });
Models.Notification.belongsTo(Models.User);
Models.Category.hasMany(Models.Notification, { as: 'Notifications' });
Models.Notification.belongsTo(Models.Category);

// create tables
Models.User.sync();
Models.Category.sync();
Models.Notification.sync();


module.exports = Models;

