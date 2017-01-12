const db = require('./db.js');

const queryNotifications = (userId, category, location, radius) => {
  // get lat and lng of location
  const { latitude, longitude } = location;

  // table that contains geolocation column:
  const table = 'notifications';
  // geolocation column:
  const geoCol = 'location';

  // SELECT id, title, description, location, "voteCount", category FROM notifications
  // where id not in (select "notificationId" from "Votes" where "userId"=2)
  // AND notifications.category='hazard' AND ST_DWithin(location,'POINT(37.7806521 -122.4070723)',200);

  return "SELECT id, title, description, location, \"voteCount\", category FROM " + table
  + " where id not in" + "(select \"notificationId\" from \"Votes\" where \"userId\"=" + userId + ")"
  + " AND " + "notifications.category=" + "'" + category + "'"
  + " AND " + "ST_DWithin(" + geoCol + "," + "'POINT(" + latitude + " " + longitude + ")'," + radius + ")"
};

const st_dwithinQuery = function (table, geoCol, lat, lng, radius) {
  // original query:
  // "SELECT * FROM notifications
  // WHERE ST_DWithin(location, 'POINT(" + lat + " " + lng + ")', " + rad + ")";
  return "SELECT * FROM " + table
  + " WHERE ST_DWithin(" + geoCol + "," + "'POINT(" + lat + " " + lng + ")'," + radius + ")";
};

const decorateNotifications = (notifications) => {
  notifications.map(({ description, title, category, location, voteCount }) => { return {
    description,
    title,
    category,
    latitude: location.coordinates.latitude,
    longitude: location.coordinates.longitude,
    votingDisabled: false,
    voteCount,
  };
  });
};

module.exports = { queryNotifications, st_dwithinQuery, decorateNotifications };
