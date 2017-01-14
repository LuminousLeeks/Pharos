const Sequelize = require('sequelize');
const db = require('../db.js');

const Notification = db.define('notification', {
  userId: Sequelize.INTEGER,
  description: Sequelize.STRING,
  location: Sequelize.GEOGRAPHY,
  voteCount: Sequelize.INTEGER,
  title: Sequelize.STRING,
  category: Sequelize.ENUM('crime', 'waitTime', 'hazard', 'publicEvent'),
});

db.authenticate().then(() => {
  Notification.sync();
}).catch((error) => {
  throw error;
});

module.exports = Notification;

