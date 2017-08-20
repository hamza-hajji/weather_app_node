const request = require('request');

var geocodeAddress = (address) => {
  adress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (err, res, body) => {
    if (err) {
      console.error('Connection to server failed.');
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Unable to find address.');
    } else if (body.status === 'OK') {
      console.log(`Adress: ${body.results[0].formatted_address}`);
      console.log(`Lat: ${body.results[0].geometry.location.lat}`);
      console.log(`Lon: ${body.results[0].geometry.location.lng}`);
    }
  });
};

module.exports = {geocodeAddress};
