
const exampleNotifications = [
  {
    userId: 1,
    title: 'Location A',
    category: 'crime',
    latitude:37.789,
    longitude: -122.408918,
    voteCount: 5,
    description:'whatever',
    categoryId:1,
  },
  // Notification
  {
    userId: 1,
    title: 'Location B',
    category: 'waitTime',
    latitude:37.789000,
    longitude: -122.408918,
    voteCount: 5,
    description:'whatever',
    categoryId:1,
  },
  {
    userId: 1,
    title: 'Location C',
    category: 'publicNotification',
    latitude:37.790000,
    longitude: -122.408000,
    voteCount: 25,
    description:'whatever',
    categoryId:1,
  },
  {
    userId: 1,
    title: 'Location D',
    category: 'hazard',
    latitude:37.7800,
    longitude: -122.408200,
    voteCount: 10,
    description:'whatever',
    categoryId:1,
  },
  {
    userId: 1,
    title: 'Location E',
    category: 'commute',
    latitude:37.7830,
    longitude: -122.408500,
    voteCount: 10,
    description:'whatever',
    categoryId:1,
  },
];

module.exports = exampleNotifications;

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
