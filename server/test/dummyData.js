module.exports = {
  notifications: [{
    text: '1',
    location: { type: 'Point', coordinates: [37.7806521, -122.4070723] },
    vote_count: 1,
    userId: 1,
    categoryId: 1,
  }, {
    text: '2',
    location: { type: 'Point', coordinates: [37.7806521, -122.4080723] },
    vote_count: 2,
    userId: 1,
    categoryId: 1,
  }, {
    text: '3',
    location: { type: 'Point', coordinates: [37.7804521, -122.4080723] },
    vote_count: 5,
    userId: 1,
    categoryId: 1,
  }, {
    text: '4',
    location: { type: 'Point', coordinates: [37.7921694, -122.4068309] },
    vote_count: 2,
    userId: 1,
    categoryId: 1,
  }],
  votes: [{
    voteType: true,
    userId: 2,
    notificationId: 1,
  }, {
    voteType: true,
    userId: 2,
    notificationId: 1,
  }, {
    voteType: false,
    userId: 3,
    notificationId: 1,
  }, {
    voteType: true,
    userId: 4,
    notificationId: 1,
  }, {
    voteType: true,
    userId: 5,
    notificationId: 1,
  }],
  users: [{
    name: 'seneca',
    password: '323',
  }, {
    name: 'epictetus',
    password: '2',
  }, {
    name: 'cato',
    password: '23232',
  }, {
    name: 'julius',
    password: '1233',
  }, {
    name: 'marc',
    password: '32123',
  }],

  categories: [{
    name: 'killing',
  }, {
    name: 'toilet line',
  }, {
    name: 'humping',
  }, {
    name: 'fighting',
  }],

  // 37.7806521,-122.4070723 //current location
  // 37.7806521,-122.4080723  //113 meter distance
  // 37.7804521,-122.4080723 //133 meter
  // 37.7921694,-122.4068309 //1236 km - point 4
};
