const request = require("request");
const forecast = (longitude, latitude, cb) => {
  const url = `https://api.darksky.net/forecast/db9e77333010bae90bad86c66fc52155/${longitude},${latitude}?units=si`;

  request({ url, json: true }, (error, { body } = {}) => {
    //error handling
    if (error) return cb("Unable To Connect to weather services");
    if (!!body.error) return cb(body.error);

    //success case
    const { temperature, precipProbability } = body.currently || {};
    const [dailyData] = body.daily.data || [];
    const { summary } = dailyData || {};
    cb(
      undefined,
      `${summary} it's ${temperature} degrees. There is ${precipProbability}% chance it would rain.`
    );
  });
};

module.exports = forecast;
