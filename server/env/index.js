const path = require('path');

const devPath = path.join(__dirname, './development.js');
const prodPath = path.join(__dirname, './production.js');
const testPath = path.join(__dirname, './testing.js');

if (process.env.NODE_ENV === 'production') {
  module.exports = require(prodPath);
} else if (process.env.NODE_ENV === 'testing') {
  module.exports = require(testPath);
} else {
  module.exports = require(devPath);
}
