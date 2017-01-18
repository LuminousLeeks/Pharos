const Sequelize = require('sequelize');
const db = require('../db/db.js');

const Category = db.define('category', {
  name: Sequelize.ENUM('crime', 'waitTime', 'hazard', 'publicNotification'),
}, {
  name: {
    singular: 'category',
    plural: 'categories',
  },
  timestamps: false,
});

module.exports = Category;
