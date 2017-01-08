/*eslint-disable*/
//es6 gives errors in mocha so use es5 syntax

const expect = require('chai').expect;
const db = require('../db/db.js');
const dummyData = require('./dummyData.js');

const dummyNotifications = dummyData.notifications;
const dummyUsers = dummyData.users;
const dummyVotes = dummyData.votes;
const dummyCategories = dummyData.categories;


const Models = require('../models/Models.js');
const Promise = require('Sequelize').Promise;
const st_dwithinQuery = require('../db/utils.js').st_dwithinQuery;

// Destructure models:
const User = Models.User;
const Category = Models.Category;
const Notification = Models.Notification
// const Vote = Models.Vote;
// console.log(Vote);
// To test you need to do all that sequentially.
// npm run dropdb (if exists) 
// npm run builddb
// npm run testdb 

describe('Database tests', function() {
  //make sure you connect
  before(function(done){
    db.authenticate().then(done);
  });

  it('should be able to create an entry', function(done) { //REFACTOR
    User.sync().then(function(){
      User.create({
        name: 'aurelius',
        password: 'marcus',
      }).then(function(user){
        Category.create({
          name: 'headshot',
        }).then(function(category){
            Notification.create({
              text: 'Axe throwing militant',
              location: dummyNotifications[0].location,
              vote_count: 0,
              userId: user.id,
              categoryId: category.id,
            }).then(function(entry){
              done();
            }).catch(function(error) {
              throw error;
            });
        }).catch(function(error) {
            throw error;
        });
      });

    });

  });

  it('should be able to findone if exists', function(done) {
    User.findOne({where: {name: 'aurelius'}})
      .then(function(response){
        expect(response.name).to.equal('aurelius');
        done();
      });
  });

  it('should be able to create one if not exists', function(done){
     User.findOne({where: {name: 'ceasar'}}).then(function(response){
      expect(response).to.be.null;
      done();
    }).catch(function(error){
      console.log(error);
    })
  });

  it('should be able to return notifications within a given radii', function(done) {
    //populate the database
    Promise.all([
      User.bulkCreate(dummyUsers),
      Category.bulkCreate(dummyCategories),
      Notification.bulkCreate(dummyNotifications)])
      // Vote.bulkCreate(dummyVotes)])
      .then(function(){
      Notification.findAll({}).then(function(results){
        // set up query parameters:
        let lat = results[0].location.coordinates[0];
        let lng = results[0].location.coordinates[1];
        let radTight = 200.0;
        let radLoose = 1500.0;
        let col = 'location';
        let table = 'notifications';
        // structure a tight and a loose query:
        let st_dwithinTight = st_dwithinQuery(table, col, lat, lng, radTight);
        let st_dwithinLarge = st_dwithinQuery(table, col, lat, lng, radLoose);
        // Test for a tight range:
        db.query(st_dwithinTight).spread(function (found, metadata) {
          expect(found.length).to.equal(results.length - 1);
          // Test for a loose range
          db.query(st_dwithinLarge).spread(function(found, metadata) {
            expect(found.length).to.equal(results.length);
            done();
          });
        });
      });
    });
  });

});

//   it('should be able to filter notifications based on votes and geolocation', function(done) {


// });

