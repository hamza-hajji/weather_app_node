const yargs   = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, data) => {
  if (errorMessage) {
    console.error(errorMessage);
  } else {
    console.log(data.address);
    weather.getWeather(data.lattitude, data.longitude, (errorMessage, data) => {
      if(errorMessage) console.error(errorMessage);
      else
        console.log(`It is currently ${data.temperature}. But, it feels ${data.apparentTemperature}.`);
    });
  }
});
