const solution1 = require('./part1.js');
const solution2 = require('./part2.js');

const name = 'Conway Cubes';

function part1 (lines) {
    return solution1.solve(lines, 6);
}

function part2 (lines) {
    return solution2.solve(lines, 6);
}

module.exports = { name, part1, part2 };
