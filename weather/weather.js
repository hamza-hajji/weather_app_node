const request = require('request');

var getWeather = (lat, lon, callback) => {
  request({
    url: `https://api.darksky.net/forecast/347a378c8434d056d1bf6762faf18722/${lat},${lon}`,
    json: true
  }, (err, res, body) => {
    if (res.statusCode === 200) {
      callback(null, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to connect to the forecast api');
    }
  });
}

module.exports = {getWeather};
