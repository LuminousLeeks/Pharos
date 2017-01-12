const Sequelize = require('sequelize');
const db = require('../db/db.js');
const User = require('./User.js');

const Notification = db.define('notification', {
  description: Sequelize.STRING,
  location: Sequelize.GEOGRAPHY,
  voteCount: Sequelize.INTEGER,
  title: Sequelize.STRING,
  category: Sequelize.ENUM('crime', 'waitTime', 'hazard', 'publicEvent'),
});

User.hasMany(Notification, { as: 'Notifications' });
Notification.belongsTo(User);

module.exports = Notification;

