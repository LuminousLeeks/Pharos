const db = require('../db/db.js');
const User = require('./User.js');
const Category = require('./Category.js');

const Subscription = db.define('subscription', {
  // insert any other settings.
});

Category.belongsToMany(User, { through: Subscription });
User.belongsToMany(Category, { through: Subscription });

module.exports = Subscription;
