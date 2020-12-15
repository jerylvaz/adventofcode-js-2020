const fs = require('fs');
const path = require('path');
const util = require('util');

const readDir = util.promisify(fs.readdir);

function printFailure (day, part, set, expected, actual) {
    /* eslint-disable no-console */
    console.log(`Day ${day} - Part ${part} - Test set ${set}`);
    console.log(`      Expected: ${expected}`);
    console.log(`        Actual: ${actual}`);
}

function executeTest (day, part, set, solutionObj, input, options, expected) {
    const actual = solutionObj[`part${part}`](input, ...options);
    const result = expected === actual;
    if (!result) printFailure(day, 1, set, expected, actual);
    return result;
}

function run () {
    return readDir(__dirname)
        .then((entries) => {
            const days = entries.filter((e) => e.startsWith('day')).sort();
            return days
                .map((_, dayIdx) => {
                    const dayStr = `day${`${dayIdx + 1}`.padStart(2, '0')}`;
                    // eslint-disable-next-line import/no-dynamic-require, global-require
                    const solution = require(path.join(__dirname, '..', 'src', dayStr, 'solution'));
                    // eslint-disable-next-line import/no-dynamic-require, global-require
                    const testData = require(path.join(__dirname, dayStr));

                    if (solution.name.length === 0) {
                        console.log(`Day ${dayIdx + 1} - Empty name`);
                        return false;
                    }

                    return [1, 2]
                        .flatMap((part) => {
                            if (testData.both) {
                                return testData.both
                                    .map((data, idx) => !data[`output${part}`]
                                        || executeTest(
                                            dayIdx + 1, part, idx, solution,
                                            data.input, data.options || [], data[`output${part}`]
                                        ));
                            }
                            return !testData[`part${part}`] || [
                                ...testData[`part${part}`]
                                    .map(({ input, options, output }, idx) => executeTest(
                                        dayIdx + 1, part, idx, solution,
                                        input, options || [], output
                                    ))
                            ];
                        })
                        .reduce((acc, val) => acc && val, true);
                });
        })
        .then((results) => {
            /* eslint-disable no-console */
            const finalResult = results.reduce((acc, val) => acc && val, true);
            console.log(finalResult ? '\x1b[32m%s\x1b[0m' : '\x1b[31m%s\x1b[0m',
                `${results.filter(Boolean).length} / ${results.length} TESTS PASSED!`);
            return finalResult;
        });
}

run()
    .then((res) => process.exit(!res))
    .catch((err) => {
        console.error(`Exception during execution: ${util.inspect(err)}`);
        process.exit(1);
    });
