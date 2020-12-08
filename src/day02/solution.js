const name = 'Password Philosophy';

function part1 (lines) {
    return lines.filter((line) => {
        const [, min, max, letter, str] = line.match(/([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/);
        const count = str.split('').filter((c) => c === letter).length;
        return (count >= min) && (count <= max);
    }).length;
}

function part2 (lines) {
    return lines.filter((line) => {
        const [, pos1, pos2, letter, str] = line.match(/([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/);
        const cond1 = str[pos1 - 1] === letter;
        const cond2 = str[pos2 - 1] === letter;
        return (cond1 || cond2) && (cond1 !== cond2);
    }).length;
}

module.exports = { name, part1, part2 };
