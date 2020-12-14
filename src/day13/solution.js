const name = 'Shuttle Search';

function part1 (lines) {
    const ts = Number(lines[0]);
    const [id, departTs] = lines[1]
        .split(',')
        .map(Number)
        .filter(Boolean)
        .map((n) => [n, Math.ceil(ts / n) * n])
        .sort(([, ts1], [, ts2]) => ts1 - ts2)
        .shift();

    return (departTs - ts) * id;
}

function part2 (lines) {
    const pairs = lines[1]
        .split(',')
        .map((n, i) => [Number(n), i])
        .filter(([n]) => Boolean(n))
        .sort(([busNr1], [busNr2]) => busNr2 - busNr1) // sort descending
        // busNr modulo positivized tsDiff pairs
        .map(([busNr, tsDiff]) => [busNr, (busNr - (tsDiff % busNr)) % busNr]);

    // https://en.wikipedia.org/wiki/Chinese_remainder_theorem#Search_by_sieving
    let val = 0;
    let step = 1;
    pairs.forEach(([modulo, remainder]) => {
        while (val % modulo !== remainder) {
            val += step;
        }
        step *= modulo;
    });

    return val;
}

module.exports = { name, part1, part2 };
