process.env.NODE_ENV = 'test';
/* eslint-disable */
var request = require('supertest');
var express = require('express');
var mocha = require('mocha');
var server = require('../../server/app/server.js');
var chai = require('chai');
var expect = require('chai').expect;
var should = require('chai').should;
var io = require('socket.io-client');

app = express();
var token = null;

describe('Register a New User and Assign a JSON Web Token at Login', () => {
  it ('Should register a new user, and provide a JSON WebToken in response', (done) => {
    request(app)
      .post('/auth/register')
      .send({
        username: 'Neo',
        password: 'matrix',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.not.be.an('error');
        expect(res.body).to.be.an('object');
        done();
      });
   })
  it('Should login a new user and provide a JSON Web Token', (done) => {
    request(app)
      .post('/auth/login')
      .send({
        username: 'Neo',
        password: 'matrix',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.not.be.an('error');
        token = res.body;
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.an('object');
        expect(io)
        done();
      })
  })
  it('Should not login an unregistered user', (done) => {
    request(app)
      .post('/auth/login')
      .send({
        username: 'Morpheus',
        password: 'redpill',
      })
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(err);
        done();
      })
  })
  it('Should deny a user with the wrong password', (done) => {
    request(app)
      .post('auth/login')
      .send({
        username: 'Neo',
        password: 'theRealOne',
      })
      .set('Accept','application/json')
      .expect(404)
      .end((err, res) => {
        expect(err);
        done();
      })
  })
})
// describe('Create a new Socket connection when a user log\'s in', () => {
//   it('Should Log a user in and open a websocket', (done) => {

//   })
// })
