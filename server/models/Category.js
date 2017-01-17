const Sequelize = require('sequelize');
const db = require('../db/db.js');

const Category = db.define('category', {
  name: Sequelize.ENUM('crime', 'waitTime', 'hazard', 'publicEvent'),
}, {
  name: {
    singular: 'category',
    plural: 'categories',
  },
});

module.exports = Category;
