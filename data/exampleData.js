
module.exports = exampleNotifications = [
  {
    id: 12345,
    title: 'Location A',
    category: 'crime',
    latitude: 37.789,
    longitude: -122.408918,
    voteCount: 17,
    thumbsUp: false,
    thumbsDown: false,
    votingDisabled: false

  },
  // Notification
  {
    id: 12344,
    title: 'Location B',
    category: 'waitTime',
    latitude: 37.7834,
    longitude: -122.4085,
    voteCount: 5,
    thumbsUp: false,
    thumbsDown: false,
    votingDisabled: false
  },
  {
    id: 12344,
    title: 'Location C',
    category: 'publicEvent',
    latitude: 37.79,
    longitude: -122.4080,
    voteCount: 25,
    thumbsUp: false,
    thumbsDown: false,
    votingDisabled: false
  },
  {
    id: 12344,
    title: 'Location D',
    category: 'hazard',
    latitude: 37.7800,
    longitude: -122.4082,
    voteCount: 10,
    thumbsUp: false,
    thumbsDown: false,
    votingDisabled: false
  },
  {
    id: 12344,
    title: 'Location E',
    category: 'commute',
    latitude: 37.7830,
    longitude: -122.4085,
    voteCount: 10,
    thumbsUp: false,
    thumbsDown: false,
    votingDisabled: false
  }
];
module.exports.exampleCategories = ['commute', 'hazard', 'publicEvent', 'crime', 'drugs', 'waitTime'];

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
