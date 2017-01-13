/*eslint-disable*/
//es6 gives errors in mocha so use es5 syntax

var expect = require('chai').expect;
var db = require('../db/db.js');
var Promise = require('Sequelize').Promise;

var st_dwithinQuery = require('../db/utils.js').st_dwithinQuery;
var queryNotifications = require('../db/utils.js').queryNotifications;

var User = require('../models/User.js');
var Notification = require('../models/Notification.js');
var Vote = require('../models/Vote.js');

// To test you need to do all that sequentially.
// npm run dropdb (if exists) 
// npm run builddb
// npm run testdb 

describe('Database query tests', function() {


  //make sure you connect
  before(function(done){
    db.authenticate().then(done).catch(function(error) {
      console.log('db not connected');
      throw error;
    });
  });

  it('should be able to create an entry', function(done) { 
      User.create({
        username: 'aurelius',
        firstName: 'John',
        lastName: 'Appleseed',
        password: 'marcus',
        salt: '1234rf'
      }).then(function(user){
            Notification.create({
              title: 'Savage Runaway',
              location: { type: 'Point', coordinates: [37.7806521, -122.4070723] },
              description: 'Axe throwing militant',
              voteCount: 0,
              userId: user.id,
              category: 'crime',
            }).then(function(entry){
              entry.destroy();
              done();
            }).catch(function(error) {
              throw error;
            });
        }).catch(function(error) {
            throw error;
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

  it('should be able to return notifications within a given radii', function(done) {
      // set up query parameters:
    
    // structure a tight and a loose query:
    var st_dwithinTight = st_dwithinQuery(table, col, lat, lng, radTight);
    var st_dwithinLarge = st_dwithinQuery(table, col, lat, lng, radLoose);

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

  it('should be able to vote', function(done) {
    var voterUserId = 3;
    var votedNotificationId = 2;
    var type = true;
    Notification.findOne({
      id: votedNotificationId
    }).then(function(instance) {
      var oldId = instance.voteCount;
      if(type) {
        return instance.increment('voteCount');
      } else {
        return instance.decrement('voteCount');
      }
    })
    .then(function(instance) {
      Vote.create({
        type: type,
        userId: voterUserId,
        notificationId: instance.id,
      })
      .catch(done).then(function(){ done(); })
    }).catch(done)
  });

  it('should be able to return a set with correct vote-ability', function(done) {
    // user 2 votes for notification 2 (in the dataset)
    // from all the notifications that are returned it should not include notification #2 
    // set up query parameters:
    var userId = 2;
    var category = 'hazard'; 
    // structure the query:
    var queryString = queryNotifications(userId, category, location, radTight);
  
    // console.log(JSON.stringify(st_dwithinTight));
    // Test for a tight range with category constraint:
    db.query(queryString).then(function (found) {
        expect(found[0].map(item => item.title).includes('5')).to.be.true;
        expect(found[0].length).to.equal(1);
        done();
      });
  });


});



//   it('should be able to filter notifications based on votes and geolocation', function(done) {


// });

