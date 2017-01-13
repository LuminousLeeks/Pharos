
module.exports = exampleNotifications = [
  {
    userId: 1,
    title: 'Location A',
    categoryType: 'crime',
    location: {type:'Point', coordinates:[37.789,-122.408918]},
    voteCount: 5,
    description:'whatever',
    categoryId:1,
  },
  // Notification
  {
    userId: 1,
    title: 'Location B',
    categoryType: 'waitTime',
    location: {type:'Point', coordinates:[37.789,-122.408918]},
    latitude: 37.7834,
    longitude: -122.4085,
    voteCount: 5,
    description:'whatever',
    categoryId:1,
  },
  {
    userId: 1,
    title: 'Location C',
    categoryType: 'publicEvent',
    location: {type:'Point', coordinates:[37.79,-122.4080]},
    voteCount: 25,
    description:'whatever',
    categoryId:1,
  },
  {
    userId: 1,
    title: 'Location D',
    categoryType: 'hazard',
    location: {type:'Point', coordinates:[37.7800,-122.4082,]},
    voteCount: 10,
    description:'whatever',
    categoryId:1,
  },
  {
    userId: 1,
    title: 'Location E',
    categoryType: 'commute',
    location: {type:'Point', coordinates:[37.7830,-122.4085]},
    voteCount: 10,
    description:'whatever',
    categoryId:1,
  }
];


// location
// {
//   latitude: 37.75825,
//   longitude: -122.4624,
//   radius: 100
// }

// voting
// {
//   user id
//   notification
//   vote (trueOr fase )
// }
