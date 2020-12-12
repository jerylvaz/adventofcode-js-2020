const util = require('util');

const Runner = require('./Runner');

/* eslint-disable no-console */

const runner = new Runner();

const heading = `${'DAY'.padStart(4)} | ${'NAME'.padEnd(24)} | ${'PART 1'.padStart(16)} | ${'PART 2'.padStart(16)} | ${'TIME (ms)'.padStart(10)}`;
console.log(heading);
console.log('-'.repeat(heading.length));

runner.on('solution', (day, name, result1, result2, time) => {
    console.log(`${`${day}`.padStart(4)} | ${name.padEnd(24)} | ${`${result1}`.padStart(16)} | ${`${result2}`.padStart(16)} | ${`${time}`.padStart(10)}`);
});

runner.run()
    .catch((err) => console.error(`Failed due to ${util.inspect(err)}`));
