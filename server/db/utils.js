module.exports = {
  st_dwithinQuery: function (table, geoCol, lat, lng, radius) {
    // original query:
    // "SELECT * FROM notifications WHERE ST_DWithin(location, 'POINT(" + lat + " " + lng + ")', " + rad + ")";
    return "SELECT * FROM " + table + " WHERE ST_DWithin(" + geoCol + "," + "'POINT(" + lat + " " + lng + ")'," + radius + ")";
  },
};
