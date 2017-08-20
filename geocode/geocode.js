const request = require('request');

var geocodeAddress = (address, callback) => {
  adress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback('Connection to server failed.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        adress: body.results[0].formatted_address,
        lattitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {geocodeAddress};
