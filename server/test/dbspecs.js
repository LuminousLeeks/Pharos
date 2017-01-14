/*eslint-disable*/
//es6 gives errors in mocha so use es5 syntax

var expect = require('chai').expect;
var db = require('../db/db.js');
var Promise = require('Sequelize').Promise;

var utils = require('../db/utils.js');
var stdWithinquery = utils.stdWithinquery;
var getNotifications = utils.getNotifications;
var insertUser = utils.insertUser;
var insertNotification = utils.insertNotification;
var insertVote = utils.insertVote;
var queryNotifications = utils.queryNotifications;

var User = require('../models/User.js');
var Notification = require('../models/Notification.js');
var Vote = require('../models/Vote.js');

// To test you need to do all that sequentially.
// npm run dropdb (if exists) 
// npm run builddb
// npm run testdb 

describe('Database tests', function() {
  //make sure you connect
  before(function(done){
    db.authenticate().then(done).catch(function(error) {
      console.log('db not connected');
      throw error;
      

    });
  });

  it('should be able to create an entry', function(done) {
    insertUser({
      username: 'aurelius',
      firstName: 'John',
      lastName: 'Appleseed',
      password: 'marcus',
    }).then(function(user){
      return insertNotification({
        title:'Savage attack',
        location: { latitude: 37.7806521, longitude: -122.4070723 },
        description: 'Axe thrower running down the street',
        userId: user.id,
        category:'crime',
      }).then(function(){
        done();
      }).catch(done);
    }); 
  });

  it('should be able to findone if exists', function(done) {
    User.findOne({where: {username: 'aurelius'}})
      .then(function(user){
        expect(user.username).to.equal('aurelius');
        return user.destroy(); 
      }).then(function(){ done(); }).catch(function(error){
        done(error);
      });
  });

  // Queries:

  var location = { latitude: 37.7806521, longitude: -122.4070723 };
  var lat = location.latitude;
  var lng = location.longitude;

  var radTight = 200.0;
  var radLoose = 1500.0;
  
  var col = 'location';
  var table = 'notifications';


  // test the proximity query:
  it('should be able to return notifications within a given radii', function(done) {
      // set up query parameters:
    
    // structure a tight and a loose query:
    var st_dwithinTight = stdWithinquery(table, col, lat, lng, radTight);
    var st_dwithinLarge = stdWithinquery(table, col, lat, lng, radLoose);

    // Test for a tight range:
    db.query(st_dwithinTight).spread(function (found, metadata) {
      expect(found.map(x => x.title).includes('4')).to.be.false;
      // Test for a loose range
      db.query(st_dwithinLarge).spread(function(found, metadata) {
        expect(found.map(y => y.title).includes('4')).to.be.true;
        done();
      });
    });
    
  });

  it('should be able query based on geolocation radius and category', function(done) {
    // set up query parameters:
    var userId = 1; // user 1 is not voted to any. So just check for category filter.
    var category = 'hazard'; 
    // structure a tight and a loose query:
    var queryString = queryNotifications(userId, category, location, radTight);
  
    // console.log(JSON.stringify(st_dwithinTight));
    // Test for a tight range with category constraint:
    db.query(queryString).then(function (found) {
        // console.log(found[0]);
        expect(found[0].map(item => item.title).includes('2')).to.be.true;
        done();
      });
  });

  it('a user should not be able to vote twice on the same notification', function(done) {
    var voterUserId = 3;
    var votedNotificationId = 2;
    var type = true;
    insertVote({
      type: true,
      userId: voterUserId,
      notificationId: votedNotificationId
    }).then(function() {
      // will fail
    }).catch(function(error){
      done();
    });
  });

  it('should be able to vote', function(done) {
    var voterUserId = 5;
    var votedNotificationId = 2;
    var type = true;
    insertVote({
      type: true,
      userId: voterUserId,
      notificationId: votedNotificationId
    }).then(function(vote){
      done();
      return vote.destroy();
    }).catch(done);
  });

  it('should be able to return a set with correct vote-ability', function(done) {
    // user 2 votes for notification 2 (in the dataset)
    // from all the notifications that are returned it should not include notification #2 
    // set up query parameters:
    var userId = 2;
    var category = 'hazard'; 
  
    // Test for a tight range with category constraint:
    getNotifications(userId, category, location, radTight).then(function (found) {
      expect(found.map(item => item.title).includes('5')).to.be.true;
      expect(found.length).to.equal(1);
      done();
    });
  });
});



//   it('should be able to filter notifications based on votes and geolocation', function(done) {


// });

