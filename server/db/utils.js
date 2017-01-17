const db = require('./db.js');
const Promise = require('bluebird');
const User = require('../models/User.js');
const Notification = require('../models/Notification.js');
const Vote = require('../models/Vote.js');
const Category = require('../models/Category.js');
const Subscription = require('../models/Subscription.js');
const bcrypt = require('bcrypt');


// Helper functions for db queries:
const queryNotifications = (userId, location, category, radius) => {
  const { latitude, longitude } = location;
  // table that contains geolocation column:
  const table = 'notifications';
  // geolocation column:
  const geoCol = 'location';

  // Postgres query:
  // select * from notifications where "categoryId" in (select "categoryId" from subscriptions where "userId"=1);
  // select * from notifications where ST_DWithin(location,'POINT(37.7806521 -122.4070723)',(select radius from users where id=2));

  return "SELECT id, title, description, location, \"voteCount\", \"categoryId\" FROM " + table
  + " where \"categoryId\" in" + "(select \"categoryId\" from subscriptions where \"userId\"=" + userId + ")"
  + " AND " + "ST_DWithin(" + geoCol + "," + "'POINT(" + latitude + " " + longitude + ")'," 
  + "(select radius from users where id=" + userId + ")" + ")"
};

// get notifications where category is x and distance to the given location is y. 

// const queryNotifications = (userId, category, location, radius) => {
//   const { latitude, longitude } = location;
//   // table that contains geolocation column:
//   const table = 'notifications';
//   // geolocation column:
//   const geoCol = 'location';

//   return "SELECT id, title, description, location, \"voteCount\", category FROM " + table
//   + " where " + "notifications.category=" + userId + ")"
//   + " AND " + "notifications.category=" + "'" + category + "'"
//   + " AND " + "ST_DWithin(" + geoCol + "," + "'POINT(" + latitude + " " + longitude + ")'," + radius + ")"
// };


const stdWithinquery = function stdWithinquery(table, geoCol, lat, lng, radius) {
  // postgres query:
  // "SELECT * FROM notifications
  // WHERE ST_DWithin(location, 'POINT(" + lat + " " + lng + ")', " + rad + ")";
  return "SELECT * FROM " + table
  + " WHERE ST_DWithin(" + geoCol + "," + "'POINT(" + lat + " " + lng + ")'," + radius + ")";
};

const overriddenBulkCreate = function overriddenBulkCreate(model, entries) {
  return new Promise(function(resolve, reject){
    Promise.all(entries.map(entry => model.create(entry, { raw: true, silent: true })))
      .then(resolve).catch(reject);
  });
};

// Exported controller functions:

// last two arguments are overload functions
// userId: integer
// category: 'enum'
// location: { latitude (float), longitude (float) }
// radius: float (meters) (ex: 100.0 is 100 meters)
const getNotifications = function getNotifications(userId, location, category, radius) {
  return new Promise((resolve, reject) => {
    db.query(queryNotifications(userId, location, category, radius),
      { type: db.QueryTypes.SELECT, model: Notification })
        .then((results) => {
          resolve(results.map(result => result.dataValues));
        }).catch(reject);
  });
};

// all inputs are string
// expect subscriptions as an array of category ids.
const insertUser = function insertUser(user, settings) {
  const { username, firstName, lastName, password } = user;
  const { radius, subscriptions } = settings;
  const salt = bcrypt.genSaltSync(10);
  const passwordToStore = bcrypt.hashSync(password, salt);
  return new Promise((resolve, reject) => {
    User.create({
      username,
      firstName,
      lastName,
      password: passwordToStore,
      salt,
      radius,
    })
    .then((user) => {
      return Category.findAll({
        where: {
          id: {
            in: subscriptions,
          },
        },
      }).then(categories => user.setCategories(categories))
        .catch(reject);
    }).then(resolve).catch(reject);
  });
};

// { title, description: string;
// userId: integer; location: { latitude (float), longitude (float) } }
const insertNotification = function insertNotification(notification) {
  const { title, location, description, userId, categoryId } = notification;
  return new Promise((resolve, reject) => {
    Notification.create({
      title,
      location: { type: 'Point', coordinates: [location.latitude, location.longitude] },
      description,
      voteCount: 0,
      userId,
      categoryId,
    }).then(resolve).catch(reject);
  });
};

// { type: boolean, userId: integer, notificationId: integer }
const insertVote = function insertVote(vote) {
  const { type, userId, notificationId } = vote;
  return new Promise((resolve, reject) => {
    Notification.findOne({
      id: notificationId,
    }).then((instance) => {
      if (type) {
        return instance.increment('voteCount');
      } else {
        return instance.decrement('voteCount');
      }
    }).then(() => {
      return Vote.create({
        type,
        userId,
        notificationId,
      }).then(resolve, reject);
    });
  });
};

const updateUser = function updateUser(userId, settings) {
  const { radius, subscriptions } = settings;
  return new Promise((resolve, reject) => {
    User.update({
      radius,
    }, { where: { id: userId }, returning: true }).then((results) => {
      const user = results[1][0]; // postgres syntax
      if (subscriptions.length === 0) {
        return resolve(user);
      }
      return Category.findAll({
        where: {
          id: {
            in: subscriptions,
          },
        },
      }).then(categories => user.setCategories(categories))
        .catch(reject);
    }).then(resolve)
      .catch(reject);
  });
};

module.exports = {
  queryNotifications,
  stdWithinquery,
  insertVote,
  insertNotification,
  insertUser,
  getNotifications,
  overriddenBulkCreate,
  updateUser,
};
