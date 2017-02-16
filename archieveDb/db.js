const Sequelize = require('sequelize');

// connect to the db:
const db = new Sequelize('pharos_archieve', 'pharos_admin', 'aware', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
  },
});

module.exports = db;
