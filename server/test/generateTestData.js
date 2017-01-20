const faker = require('faker');
// const _ = require('lodash');
const bcrypt = require('bcrypt');
const db = require('../db/db.js');
const User = require('../models/User.js');
const Notification = require('../models/Notification.js');
const Vote = require('../models/Vote.js');
const overriddenBulkCreate = require('../db/utils.js').overriddenBulkCreate;
const Category = require('../models/Category.js');
const Subscription = require('../models/Subscription.js');

// volume of data:
const userNumber = 1000;
const voteNumber = 6000;
const notificationNumber = 1500;

// constants for all users:
const pass = '123456';
const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync(pass, salt);
const latitude1 = 37.697676;
const longitude1 = -122.49258;
const latitude2 = 37.791608;
const longitude2 = -122.391129;


let users = [];
let notifications = [];
let votes = [];
let categories = [];
let subscriptions = [];
let categoryTypes = ['crime', 'waitTime', 'hazard', 'publicEvent'];

// random generator helpers:
const generateCategoryId = function generateCategory() {
  // const categoryEnum = ['crime', 'waitTime', 'hazard', 'publicEvent'];
  return Math.floor(Math.random() * 4) + 1; //should be 1 -4
};

const generateRandomId = function generateRandomId(range) {
  return Math.floor(Math.random() * range) + 1; // starts from 1
};

const generateRandomPast = function generateRandomPast() {
  // all data is generated in the last month (720 hours)
  const randomHour = Math.floor(Math.random() * 720);
  return new Date(Date.now() - (randomHour * 60 * 60 * 1000));
};

const generateRandomCoordinates = function generateRandomCoordinates(lat1, lat2, lng1, lng2) {
  // san francisco area:
  // left bottom corner : 37.697676, -122.49258 (lat1, lng1)
  // right top corner: 37.791608 -122.391129 (lat2, lng2)
  const lat = Math.floor((Math.random() * (lat2 - lat1)) * 1000000) / 1000000;
  const lng = Math.floor((Math.random() * (lng2 - lng1)) * 1000000) / 1000000;

  // add a random increment to the left bottom corner:
  return [lat1 + lat, lng1 + lng];
};

// Database helpers:

// Generate datasets:

for (let i = 0; i < categoryTypes.length; i++) {
  categories.push({
    name: categoryTypes[i],
  });
}

for (let i = 0; i < userNumber; i++) {
  let randName = faker.name.findName();
  let email = faker.internet.email();
  let firstName = randName.split(' ')[0];
  let lastName = randName.split(' ')[1];
  let randomPassword = faker.internet.password();
  let username = faker.internet.userName();
  let radius =  Math.floor(Math.random() * 1500);

  users.push({
    firstName,
    lastName,
    password,
    salt,
    username,
    email,
    radius,
  });
}

for (let i = 0; i < notificationNumber; i++) {
  let description = faker.lorem.sentence();
  let title = faker.random.word();
  let voteCount = 0;
  let userId = generateRandomId(userNumber);
  let categoryId = generateCategoryId();
  let updatedAt = generateRandomPast();
  let location = {
    type: 'Point',
    coordinates: generateRandomCoordinates(latitude1, latitude2, longitude1, longitude2),
  };
  notifications.push({
    userId,
    description,
    location,
    title,
    voteCount,
    categoryId,
    updatedAt,
  });
};

for (let i = 1; i < users.length; i++) {
  let randomCategoryId = generateCategoryId();
  subscriptions.push({
    userId: i,
    categoryId: randomCategoryId,
  });
  (randomCategoryId > 1) ? randomCategoryId -= 1 : randomCategoryId += 1;
  subscriptions.push({
    userId: i,
    categoryId: randomCategoryId,
  });
}

// Votes are disabled for now:
// for (let i = 0; i < notificationNumber; i++) {
//   let type = faker.random.boolean();
//   let userId = generateRandomId(userNumber);
//   let notificationId = generateRandomId(notificationNumber);
//   votes.push({
//     type,
//     userId,
//     notificationId,
//   });
// }

// console.log(notifications.map(n => n.location.coordinates));

// Load all to the database:

db.sync({ force: true })
.then(function() {
  return Category.bulkCreate(categories);
})
.then(function() {
  return User.bulkCreate(users);
})
.then(function() {
  return Subscription.bulkCreate(subscriptions);
})
.then(function(){
  return overriddenBulkCreate(Notification, notifications); //to override updatedAt
})
// .then(function() {
//   return Vote.bulkCreate(votes);
// })
.catch(function(error) {
  throw error;
});
