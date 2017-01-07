const _ = require('lodash');
const pharosSession = require('./../RESTController/Sessions.js');
//  TODO:Session manager needs to be linked

module.exports = (pharosSocket) => {
  console.log('Pharos Socket is ready');
  pharosSocket.on('connection', () => {
    console.log('connected to io');
  })
};