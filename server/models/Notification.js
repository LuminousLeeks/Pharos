const Sequelize = require('sequelize');
const db = require('../db/db.js');
const User = require('./User.js');
const Category = require('./Category.js');

const Notification = db.define('notification', {
  description: Sequelize.STRING,
  location: Sequelize.GEOGRAPHY,
  voteCount: Sequelize.INTEGER,
  title: Sequelize.STRING,
});

User.hasMany(Notification, { as: 'Notifications' });
Notification.belongsTo(User);

Category.hasMany(Notification, { as: 'Notifications' });
Notification.belongsTo(Category);

module.exports = Notification;

