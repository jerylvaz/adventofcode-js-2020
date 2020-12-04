const fs = require('fs');
const path = require('path');
const util = require('util');

const readInput = require('./utils/readInput');

const readDir = util.promisify(fs.readdir);

function run (daysToRun = null) {
    return readDir(__dirname)
        .then((entries) => {
            const dayDirs = entries.filter((e) => e.startsWith('day')).sort();
            const promises = dayDirs
                .map((dayDir) => [dayDir, Number(dayDir.substr(dayDir.length - 2))])
                .filter(([, day]) => !daysToRun || daysToRun.includes(day))
                .map(([dayDir, day]) => {
                    // eslint-disable-next-line import/no-dynamic-require, global-require
                    const solve = require(path.join(__dirname, dayDir, 'solution'));
                    return readInput(path.join(__dirname, dayDir, 'input.txt'))
                        .then((data) => ([
                            day,
                            solve.name,
                            solve.part1(data),
                            solve.part2(data)
                        ]));
                });
            return Promise.all(promises);
        })
        .then((results) => {
            const heading = `${'DAY'.padStart(4)} | ${'NAME'.padEnd(24)} | ${'PART 1'.padStart(16)} | ${'PART 2'.padStart(16)}`;
            const outputLines = [heading];
            outputLines.push('-'.repeat(heading.length));
            results.forEach(([day, name, result1, result2]) => {
                outputLines.push(`${`${day}`.padStart(4)} | ${name.padEnd(24)} | ${`${result1}`.padStart(16)} | ${`${result2}`.padStart(16)}`);
            });

            return outputLines.join('\n');
        });
}

module.exports = run;
