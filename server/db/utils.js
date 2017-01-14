const db = require('./db.js');
const Promise = require('bluebird');
const User = require('../models/User.js');
const Notification = require('../models/Notification.js');
const Vote = require('../models/Vote.js');
const bcrypt = require('bcrypt');


// Helper functions for db queries:
const queryNotifications = (userId, category, location, radius) => {
  const { latitude, longitude } = location;
  // table that contains geolocation column:
  const table = 'notifications';
  // geolocation column:
  const geoCol = 'location';

  // Postgres query:
  // SELECT id, title, description, location, "voteCount", category FROM notifications
  // where id not in (select "notificationId" from "Votes" where "userId"=2)
  // AND notifications.category='hazard' AND ST_DWithin(location,'POINT(37.7806521 -122.4070723)',200);

  return "SELECT id, title, description, location, \"voteCount\", category FROM " + table
  + " where id not in" + "(select \"notificationId\" from \"Votes\" where \"userId\"=" + userId + ")"
  + " AND " + "notifications.category=" + "'" + category + "'"
  + " AND " + "ST_DWithin(" + geoCol + "," + "'POINT(" + latitude + " " + longitude + ")'," + radius + ")"
};

const stdWithinquery = function stdWithinquery(table, geoCol, lat, lng, radius) {
  // postgres query:
  // "SELECT * FROM notifications
  // WHERE ST_DWithin(location, 'POINT(" + lat + " " + lng + ")', " + rad + ")";
  return "SELECT * FROM " + table
  + " WHERE ST_DWithin(" + geoCol + "," + "'POINT(" + lat + " " + lng + ")'," + radius + ")";
};

// Exported controller functions:

// userId: integer
// category: 'enum'
// location: { latitude (float), longitude (float) }
// radius: float (meters) (ex: 100.0 is 100 meters)
const getNotifications = function getNotifications(userId, category, location, radius) {
  return new Promise((resolve, reject) => {
    db.query(queryNotifications(userId, category, location, radius),
      { type: db.QueryTypes.SELECT, model: Notification })
        .then((results) => {
          resolve(results.map(result => result.dataValues));
        }).catch(reject);
  });
};

// all inputs are string
const insertUser = function insertUser(user) {
  const { username, firstName, lastName, password } = user;
  const salt = bcrypt.genSaltSync(10);
  const passwordToStore = bcrypt.hashSync(password, salt);
  return new Promise((resolve, reject) => {
    User.create({
      username,
      firstName,
      lastName,
      password: passwordToStore,
      salt,
    }).then(resolve).catch(reject);
  });
};

// { title, description: string;
// userId: integer; location: { latitude (float), longitude (float) } }
const insertNotification = function insertNotification(notification) {
  const { title, location, description, userId, category } = notification;
  return new Promise((resolve, reject) => {
    Notification.create({
      title,
      location: { type: 'Point', coordinates: [location.latitude, location.longitude] },
      description,
      voteCount: 0,
      userId,
      category,
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

const decorateNotifications = (notifications) => {
  notifications.map(({ description, title, category, location, voteCount }) => { return {
    description,
    title,
    category,
    latitude: location.coordinates.latitude,
    longitude: location.coordinates.longitude,
    votingDisabled: false,
    voteCount,
  };
  });
};

module.exports = {
  queryNotifications,
  stdWithinquery,
  decorateNotifications,
  insertVote,
  insertNotification,
  insertUser,
  getNotifications,
};
