const name = 'Toboggan Trajectory';

function pass (lines, right, down) {
    return lines
        .filter((_, idx) => (idx % down) === 0)
        .filter((line, idx) => line[(idx * right) % line.length] === '#')
        .length;
}

function part1 (lines) {
    return pass(lines, 3, 1);
}

function part2 (lines) {
    return pass(lines, 1, 1)
        * pass(lines, 3, 1)
        * pass(lines, 5, 1)
        * pass(lines, 7, 1)
        * pass(lines, 1, 2);
}

module.exports = { name, part1, part2 };
