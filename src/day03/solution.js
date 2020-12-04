
function rotate(str, count) {
    count = count % str.length;
    let arr = str.split('')
    for (let i = 0; i < count ; ++i)
        arr.push(arr.shift());
    return arr.join('');
}

function pass(lines, right, down) {
    return lines
        .filter((_, idx) => (idx % down) === 0)
        .map((line, idx) => rotate(line, idx * right))
        .filter((line) => line[0] === '#')
        .length;
}

function part1(lines) {
    return pass(lines, 3, 1);
}

function part2(lines) {
    return pass(lines, 1, 1) *
        pass(lines, 3, 1) *
        pass(lines, 5, 1) *
        pass(lines, 7, 1) *
        pass(lines, 1, 2);
}

module.exports = { part1, part2 };
