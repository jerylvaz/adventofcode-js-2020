const name = 'Password Philosophy';

function part1 (lines) {
    return lines.filter((line) => {
        const [range, letterAndColon, str] = line.split(/\s/);
        const [min, max] = range.split('-');
        const letter = letterAndColon[0];
        const count = str.split('').filter((c) => c === letter).length;
        return (count >= min) && (count <= max);
    }).length;
}

function part2 (lines) {
    return lines.filter((line) => {
        const [range, letterAndColon, str] = line.split(/\s/);
        const [pos1, pos2] = range.split('-');
        const letter = letterAndColon[0];
        const cond1 = str[pos1 - 1] === letter;
        const cond2 = str[pos2 - 1] === letter;
        return (cond1 || cond2) && (cond1 !== cond2);
    }).length;
}

module.exports = { name, part1, part2 };
