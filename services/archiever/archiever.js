// Archieve db data that is older then x hours.
// Use the below command to summon the archiever.
// npm run buildArchiever


console.log('hello inside the file');

const Sequelize = require('sequelize');

//connect to the db:
const archieveDb = new Sequelize('pharos_db', 'pharos_admin', 'aware', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
  },
});


archieveDb.authenticate().then(function() {
  // do copying stuff here

});

