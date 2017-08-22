const yargs   = require('yargs');

const axios = require('axios');

var argv = yargs
          .options({
            a: {
              demand: true,
              alias: 'address',
              describe: 'Your adress',
              string: true
            }
          })
          .help()
          .alias('help', 'h')
          .argv;

var address = encodeURIComponent(argv.a);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`

axios.get(geocodeURL)
.then((response) => {
  if (response.data.status === 'ZERO_RESULTS')
    throw new Error('Unable to find address.');

  var lat = response.data.results[0].geometry.location.lat;
  var lon = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.darksky.net/forecast/347a378c8434d056d1bf6762faf18722/${lat},${lon}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);
})
.then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}, but it feels like ${apparentTemperature}`);
})
.catch((e) => {
  if (e.code === 'ENOTFOUND')
    console.log('Unable to connect to API.');
  else
    console.log(e.message);
});
