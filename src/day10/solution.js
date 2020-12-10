const name = 'Adapter Array';

function part1 (lines) {
    const input = lines.map(Number).sort((a, b) => a - b);
    const diffs = [0, ...input, input[input.length - 1] + 3]
        .map((e, i, a) => (i ? e - a[i - 1] : 0));

    const eq = (x) => (arg) => arg === x;
    return diffs.filter(eq(1)).length * diffs.filter(eq(3)).length;
}

function part2 (lines) {
    return [0, ...lines.map(Number).sort((a, b) => a - b)]
        .map((e, i, a) => (i ? e - a[i - 1] : 0))
        .filter(Boolean) // remove first zero
        .join('')
        .split(/3+/) // split into sequences of 1s
        .map((s) => s.length) // sizes of each sequence
        .map((v) => [1, 1, 2, 4, 7][v]) // Tribonacci
        .reduce((acc, v) => acc * v, 1);
}

module.exports = { name, part1, part2 };
