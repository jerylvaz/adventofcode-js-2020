const run = require('../src/runner');

const expectedOutput = `
 DAY | NAME                     |           PART 1 |           PART 2
---------------------------------------------------------------------
   1 | Report Repair            |           138379 |         85491920
   2 | Password Philosophy      |              517 |              284
   3 | Toboggan Trajectory      |              145 |       3424528800
   4 | Passport Processing      |              208 |              167
   5 | Binary Boarding          |              883 |              532
`.replace(/^\n/, '').replace(/\n$/, '');

run()
    .then((out) => {
        /* eslint-disable no-console */

        if (out === expectedOutput) {
            console.log('Test passed!');
            process.exit(0);
        } else {
            const outLines = out.split(/\n/);
            const expectedOutLines = expectedOutput.split(/\n/);
            if (outLines.length !== expectedOutLines.length) {
                console.error('Failure: Line count mismatch!');
            } else {
                outLines.forEach((outLine, idx) => {
                    if (outLine !== expectedOutLines[idx]) {
                        console.error(`Line ${idx}:`);
                        console.error(`    Expected: '${expectedOutLines[idx]}'`);
                        console.error(`      Actual: '${outLine}'`);
                    }
                });
            }
            console.log('Test failed!');
            process.exit(1);
        }
    });
