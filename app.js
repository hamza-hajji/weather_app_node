const request = require('request');
const yargs   = require('yargs');

const argv = yargs
              .options({
                a: {
                  demand: true,
                  alias: 'adress',
                  describe: 'Your adress',
                  string: true
                }
              })
              .help()
              .alias('help', 'h')
              .argv;
console.log(argv);
var adress = encodeURIComponent(argv.adress);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${adress}`,
  json: true
}, (err, res, body) => {
  console.log(`Adress: ${body.results[0].adress_formated}`);
  console.log(`Lat: ${body.results[0].geometry.location.lat}`);
  console.log(`Lon: ${body.results[0].geometry.location.lng}`);
});
