const util = require('util');

const Runner = require('./Runner');

/* eslint-disable no-console */

const daysToRun = process.argv.slice(2).map(Number).filter((x) => !Number.isNaN(x));

const runner = new Runner();

const heading = `${'DAY'.padStart(4)} | ${'NAME'.padEnd(24)} | ${'PART 1'.padStart(20)} | ${'PART 2'.padStart(52)} | ${'TIME'.padStart(10)}`;
console.log(heading);
console.log('-'.repeat(heading.length));

const results = [];
runner.on('solution', (day, name, result1, result2, time) => {
    const resultStr = `${`${day}`.padStart(4)} | ${name.padEnd(24)} | ${`${result1}`.padStart(20)} | ${`${result2}`.padStart(52)} | ${`${time}`.padStart(10)}`;
    results.push(resultStr);
});

runner.run(daysToRun)
    .then(() => {
        console.log(results.sort().join('\n'));
    })
    .catch((err) => console.error(`Failed due to ${util.inspect(err)}`));
