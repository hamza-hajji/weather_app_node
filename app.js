const yargs   = require('yargs');

const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.error(errorMessage);
  } else {
    console.log(JSON.stringify(results, null, 2));
  }
});
