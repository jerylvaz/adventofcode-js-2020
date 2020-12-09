const name = 'Encoding Error';

function combinations (arr) {
    return arr.flatMap((val, idx) => arr.slice(idx + 1).map((x) => [val, x]));
}

function part1 (lines, preambleLen = 25) {
    return lines.map(Number)
        .find((n, idx, arr) => idx >= preambleLen
            && !combinations(arr.slice(idx - preambleLen, idx)).some(([x, y]) => x + y === n))
        || -1;
}

function part2 (lines, preambleLen = 25) {
    const invalidNumber = part1(lines, preambleLen);
    const nums = lines.map(Number);
    for (let i = 0; i < nums.length - 2; ++i) {
        for (let j = i + 2; j <= nums.length; ++j) {
            const subArr = nums.slice(i, j);
            if (subArr.reduce((acc, n) => acc + n, 0) === invalidNumber) {
                const sortedSubArr = subArr.sort((a, b) => a - b);
                return sortedSubArr[0] + sortedSubArr[sortedSubArr.length - 1];
            }
        }
    }
    return -1;
}

module.exports = { name, part1, part2 };
