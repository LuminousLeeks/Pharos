/* eslint-disable */

var request = require('supertest');
// var should = require('should')
var expect = require('chai').expect;
var express = require('express');
// request = request('http://localhost:8090');


// var db = require('./db/db.js');
// var User = require('./user/user.js');

// var app = express();

//server tests

// describe('GET /', function() {
//   it('should respond', function(done) {
//     request
//       .get('/')
//       .set('Accept', 'application/json')
//       .expect(200, done);
//   });
// });

// describe('GET /api', function() {
//   it('should respond', function(done) {
//     request
//       .get('/')
//       .set('Accept', 'application/json')
//       .expect(200, done);
//   });

describe('socket tests', function() {
  var io = require('../app/server.js');
  var socket = io('http://127.0.0.1:8099', {
      transports: ['websocket'], // you need to explicitly tell it to use websockets
    });

  before(function(){
    socket.on('connection', () => {
      console.log('connected!');
      socket.emit('getNotifications', (done) => {
        // console.log("notifications", data);
        done();
      });
    });
  });

  it('should respond to the post request', function(done){
    socket.on('connection', (socket) => {
      socket.on('getNotifications', (callback) => {
        callback(done);
      });
      socket.emit('postNotificaions', [], (done) => {
        done();
      });

    });
  });

});
