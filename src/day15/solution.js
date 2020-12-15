const name = 'Rambunctious Recitation';

function solve (initSeq, n) {
    const numMap = {};

    let lastNum = initSeq.pop();
    initSeq.forEach((s, idx) => {
        numMap[s] = idx + 1;
    });

    for (let pos = initSeq.length + 1; pos < n; ++pos) {
        const lastPos = numMap[lastNum];
        const newNum = (lastPos === undefined) ? 0 : (pos - lastPos);
        numMap[lastNum] = pos;
        lastNum = newNum;
    }

    return lastNum;
}

function part1 (lines) {
    const initSeq = lines[0].split(',').map(Number);
    return solve(initSeq, 2020);
}

function part2 (lines) {
    const initSeq = lines[0].split(',').map(Number);
    return solve(initSeq, 30000000);
}

module.exports = { name, part1, part2 };
