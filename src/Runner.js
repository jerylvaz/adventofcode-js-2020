const events = require('events');
const fs = require('fs');
const path = require('path');
const util = require('util');

const readInput = require('./utils/readInput');

const readDir = util.promisify(fs.readdir);

class Runner extends events.EventEmitter {
    run (daysToRun = null) {
        return readDir(__dirname)
            .then((entries) => {
                const dayDirs = entries.filter((e) => e.startsWith('day')).sort();
                const promises = dayDirs
                    .map((dayDir) => [dayDir, Number(dayDir.substr(dayDir.length - 2))])
                    .filter(([, day]) => !daysToRun || !daysToRun.length || daysToRun.includes(day))
                    .map(([dayDir, day]) => {
                        // eslint-disable-next-line import/no-dynamic-require, global-require
                        const solve = require(path.join(__dirname, dayDir, 'solution'));
                        return readInput(path.join(__dirname, dayDir, 'input.txt'))
                            .then((data) => {
                                const startTime = process.hrtime();
                                const result1 = solve.part1(data);
                                const result2 = solve.part2(data);
                                const [secs, nanosecs] = process.hrtime(startTime);

                                let timeStr = '';
                                if (!secs) {
                                    if (nanosecs < 1000000) {
                                        timeStr = `${Math.floor(nanosecs / 1000)}us`;
                                    } else {
                                        timeStr = `${Math.floor(nanosecs / 1000000)}ms`;
                                    }
                                } else if (secs < 60) {
                                    timeStr = `${secs}s`;
                                } else if (secs < 5 * 60) {
                                    timeStr = `${Math.floor(secs / 60)}min ${secs % 60}s`;
                                } else {
                                    timeStr = `${Math.floor(secs / 60)}min`;
                                }

                                this.emit('solution', day, solve.name, result1, result2, timeStr);
                            });
                    });
                return Promise.all(promises);
            });
    }
}

module.exports = Runner;
