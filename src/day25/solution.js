const name = 'Combo Breaker';

function part1 (lines) {
    const [pubKey1, pubKey2] = lines.map(Number);
    let newSubject = 0;

    let runningValues = [1, 1];
    let loopSize = 0;
    while (!newSubject) {
        loopSize += 1;
        runningValues = runningValues.map((r) => (r * 7) % 20201227);
        if (runningValues[0] === pubKey1) {
            newSubject = pubKey2;
        }
        if (runningValues[1] === pubKey2) {
            newSubject = pubKey1;
        }
    }

    let runningValue = 1;
    for (let i = 0; i < loopSize; ++i) {
        runningValue = (runningValue * newSubject) % 20201227;
    }

    return runningValue;
}

function part2 () {
    return 0;
}

module.exports = { name, part1, part2 };
