const name = 'Seating System';

function eq (v) {
    return (x) => x === v;
}

function findAllNeighbors (arr, width, idx) {
    // eslint-disable-next-line no-bitwise
    const row = ~~(idx / width);
    const col = idx % width;
    const maxRows = arr.length / width;

    return [
        Array(width - col - 1).fill().map((e, i) => row * width + col + i + 1),
        Array(col).fill().map((e, i) => row * width + i).reverse(),
        Array(row).fill().map((e, i) => i * width + col).reverse(),
        Array(maxRows - row - 1).fill().map((e, i) => (i + row + 1) * width + col),
        Array(Math.min(row, (width - col - 1))).fill()
            .map((e, i) => (row - i - 1) * width + col + i + 1),
        Array(Math.min(maxRows - row - 1, (width - col - 1))).fill()
            .map((e, i) => (row + i + 1) * width + col + i + 1),
        Array(Math.min(maxRows - row - 1, col)).fill()
            .map((e, i) => (row + i + 1) * width + col - i - 1),
        Array(Math.min(row, col)).fill().map((e, i) => (row - i - 1) * width + col - i - 1)
    ]
        .map((dirArray) => dirArray.map((i) => arr[i]));
}

function findNrImmediateNeighbors (arr, width, idx) {
    return findAllNeighbors(arr, width, idx)
        .map((dirArray) => dirArray.shift())
        .filter(eq('#'))
        .length;
}

function findNrVisibleNeighbors (arr, width, idx) {
    return findAllNeighbors(arr, width, idx)
        // append to let indexOf always return a +ve index
        // eslint-disable-next-line no-sequences
        .map((dirArray) => (dirArray.push('L'), dirArray))
        .filter((dirArray) => dirArray
            .slice(0, dirArray.indexOf('L')) // slice until nearest seat
            .filter(eq('#'))
            .length)
        .length;
}

function pass (arr, width, findFunc, tolerance) {
    return arr.map((e, idx) => {
        if (e === 'L') {
            return findFunc(arr, width, idx) === 0 ? '#' : 'L';
        }
        if (e === '#') {
            return findFunc(arr, width, idx) >= tolerance ? 'L' : '#';
        }
        return e;
    });
}

function areEqual (arr1, arr2) {
    return arr1.every((e, idx) => e === arr2[idx]);
}

function part1 (lines) {
    const width = lines[0].length;
    let arr = lines.join('').split('');
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const newArr = pass(arr, width, findNrImmediateNeighbors, 4);
        if (areEqual(arr, newArr)) break;
        arr = newArr;
    }
    return arr.filter(eq('#')).length;
}

function part2 (lines) {
    const width = lines[0].length;
    let arr = lines.join('').split('');
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const newArr = pass(arr, width, findNrVisibleNeighbors, 5);
        if (areEqual(arr, newArr)) break;
        arr = newArr;
    }
    return arr.filter(eq('#')).length;
}

module.exports = { name, part1, part2 };
