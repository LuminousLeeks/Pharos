const Sequelize = require('sequelize');

const url = 'localhost';

// to run on your local machine: (OSX)
// brew install postgres
// brew install postgis
// both in local dir, so it will end up in ../usr/local/..
// to start the postgres server (you have to specify where postgres config files are):
// postgres -D /usr/local/var/postgres (your path can be different depending on your brew config)

// environment variables will change based on deployment methods.
// user: pharos_admin
// pass: aware
const db = new Sequelize('pharos_db', 'pharos_admin', 'aware', {
  host: url,
  dialect: 'postgres',
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
  },
});

db.authenticate().then(() => {
  console.log('connected to the db');
}).catch((err) => {
  console.log('failed to connect');
  throw err;
});

module.exports = db;
