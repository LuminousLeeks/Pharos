const Sequelize = require('sequelize');
const db = require('../db/db.js');
const User = require('./User.js');
const Notification = require('./Notification.js');

const Vote = db.define('Vote', {
  type: Sequelize.BOOLEAN,
});

Notification.belongsToMany(User, { through: Vote });
User.belongsToMany(Notification, { through: Vote });

module.exports = Vote;
