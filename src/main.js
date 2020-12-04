const util = require('util');

const run = require('./runner');

/* eslint-disable no-console */

run()
    .then((out) => console.log(out))
    .catch((err) => console.error(`Failed due to ${util.inspect(err)}`));
