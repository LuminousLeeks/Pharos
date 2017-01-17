// A script that loads thousands of random user, notification and vote data to the db. //

var db = require('../db/db.js');
var User = require('../models/User.js');
var Notification = require('../models/Notification.js');
var Vote = require('../models/Vote.js');
var Category = require('../models/Category.js');
var Subscription = require('../models/Subscription.js');

// var Promise = require('Sequelize').Promise;
// Populate the database

// npm run builddb
// npm run populatedb

var data = {
  categories: [{
    name: 'hazard',
  }, {
    name: 'crime',
  }, {
    name: 'waitTime',
  }, {
    name: 'publicEvent',
  }],
  notifications: [{
    title: '1',
    location: { type: 'Point', coordinates: [37.7806521, -122.4070723] },
    voteCount: 1,
    userId: 1,
    description: 'Whatever',
    categoryId: 1,
  }, {
    title: '2',
    location: { type: 'Point', coordinates: [37.7806521, -122.4080723] },
    voteCount: 2,
    userId: 1,
    description: 'Whatever',
    categoryId: 2,
  }, {
    title: '3',
    location: { type: 'Point', coordinates: [37.7804521, -122.4080723] },
    voteCount: 5,
    userId: 1,
    description: 'Whatever',
    categoryId: 3,
  }, {
    title: '5',
    location: { type: 'Point', coordinates: [37.7804521, -122.4080723] },
    voteCount: 6,
    userId: 1,
    description: 'Whatever',
    categoryId: 4,
  }, {
    title: '4',
    location: { type: 'Point', coordinates: [37.7921694, -122.4068309] },
    voteCount: 2,
    userId: 1,
    description: 'Whatever',
    categoryId: 2,
  }],
  votes: [{
    type: true,
    userId: 2,
    notificationId: 1,
  }, {
    type: true,
    userId: 2,
    notificationId: 2,
  }, {
    type: false,
    userId: 3,
    notificationId: 2,
  }, {
    type: true,
    userId: 4,
    notificationId: 3,
  }, {
    type: true,
    userId: 5,
    notificationId: 4,
  }],
  users: [{
    username: 'seneca1',
    firstName: 'John',
    lastName: 'Appleseed',
    password: '123456',
    salt: '123452',
    email: 'dkamen@gmail.com',
    radius: 200,
  }, {
    username: 'epictetus1',
    firstName: 'John',
    lastName: 'Appleseed',
    password: '123456',
    salt: '123452',
    email: 'dkamen@gmail.com',
    radius: 1500,
  }, {
    username: 'cato1',
    firstName: 'John',
    lastName: 'Appleseed',
    password: '123456',
    salt: '123452',
    email: 'dkamen@gmail.com',
    radius: 200,
  }, {
    username: 'julius1',
    firstName: 'John',
    lastName: 'Appleseed',
    password: '123456',
    salt: '123452',
    email: 'dkamen@gmail.com',
    radius: 1500,
  }, {
    username: 'marc1',
    firstName: 'John',
    lastName: 'Appleseed',
    password: '123456',
    salt: '123452',
    email: 'dkamen@gmail.com',
    radius: 200,
  }],
  subscriptions: [{
    userId: 1,
    categoryId: 1,
  }, {
    userId: 2,
    categoryId: 2,
  }, {
    userId: 3,
    categoryId: 3,
  }, {
    userId: 4,
    categoryId: 4,
  }, {
    userId: 4,
    categoryId: 2,
  }, {
    userId: 5,
    categoryId: 1,
  }, {
    userId: 1,
    categoryId: 2,
  }, {
    userId: 5,
    categoryId: 4,
  },
  ],
  // 37.7806521,-122.4070723 //current location
  // 37.7806521,-122.4080723  //113 meter distance
  // 37.7804521,-122.4080723 //133 meter
  // 37.7921694,-122.4068309 //1236 km - point 4
};

db.sync({ force:true }).then(function(){
  return User.bulkCreate(data.users);
})
.then(function(){
  return Category.bulkCreate(data.categories);
})
.then(function(){
  return Notification.bulkCreate(data.notifications);
})
.then(function(){
  return Vote.bulkCreate(data.votes);
})
.then(function(){
  return Subscription.bulkCreate(data.subscriptions);
})
.catch(function(error) {
  throw error;
});

module.exports = data;
