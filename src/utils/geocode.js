const request = require("request");

const geocode = (address, cb) => {
  const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW9oYW1tZWRlc3NhbSIsImEiOiJjazJ0anhuYjExODhsM2RwNzZldmQ4c2s2In0._5R-CFemWAxGmE2lK-I5rg&limit=1`;
  request({ uri: geoCodingUrl, json: true }, (err, { body } = {}) => {
    //error handling
    if (err) return cb("Unable To Connect To geocoding services");
    if (!!body.message) return cb(body.message);

    //success case
    const [featuresData] = body.features || [];
    //in case of no place found
    if (!featuresData) return cb("Unable to find the place!");
    const { center } = featuresData || {};
    const [long, lat] = center || [];
    cb(undefined, { long, lat, location: featuresData.place_name });
  });
};

module.exports = geocode;
