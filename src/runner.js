const fs = require('fs');
const path = require('path');
const util = require('util');

const readInput = require('./utils/readInput');

const readDir = util.promisify(fs.readdir);

readDir(__dirname)
    .then((entries) => {
        const days = entries.filter((e) => e.startsWith('day')).sort();
        const promises = days.map((day) => {
            const solve = require(path.join(__dirname, day, 'solution'));
            return readInput(path.join(__dirname, day, 'input.txt'))
                .then((data) => ([
                    solve.part1(data),
                    solve.part2(data),
                ]));
        });
        return Promise.all(promises);
    })
    .then((results) => {
        const heading = `${'DAY'.padStart(4)} | ${'PART 1'.padStart(16)} | ${'PART 2'.padStart(16)}`;
        console.log(heading);
        console.log('-'.repeat(heading.length));
        results.forEach(([result1, result2], day) => {
            console.log(`${`${day}`.padStart(4)} | ${`${result1}`.padStart(16)} | ${`${result2}`.padStart(16)}`);
        })
    })
    .catch((err) => console.error(`Failed due to ${util.inspect(err)}`));
