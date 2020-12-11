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
        /* E  */ Array(width - col - 1).fill().map((e, i) => row * width + col + i + 1),
        /* W  */ Array(col).fill().map((e, i) => row * width + i).reverse(),
        /* N  */ Array(row).fill().map((e, i) => i * width + col).reverse(),
        /* S  */ Array(maxRows - row - 1).fill().map((e, i) => (i + row + 1) * width + col),
        /* NE */ Array(Math.min(row, (width - col - 1))).fill()
            .map((e, i) => (row - i - 1) * width + col + i + 1),
        /* SE */ Array(Math.min(maxRows - row - 1, (width - col - 1))).fill()
            .map((e, i) => (row + i + 1) * width + col + i + 1),
        /* SW */ Array(Math.min(maxRows - row - 1, col)).fill()
            .map((e, i) => (row + i + 1) * width + col - i - 1),
        /* NW */ Array(Math.min(row, col)).fill().map((e, i) => (row - i - 1) * width + col - i - 1)
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
        if (e === '.') {
            return e;
        }
        const nrNeighbors = findFunc(arr, width, idx);
        if (e === 'L') return nrNeighbors === 0 ? '#' : 'L';
        return nrNeighbors >= tolerance ? 'L' : '#';
    });
}

function areEqual (arr1, arr2) {
    return arr1.every((e, idx) => e === arr2[idx]);
}

function run (lines, findFunc, tolerance) {
    const width = lines[0].length;
    let arr = lines.join('').split('');
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const newArr = pass(arr, width, findFunc, tolerance);
        if (areEqual(arr, newArr)) break;
        arr = newArr;
    }
    return arr.filter(eq('#')).length;
}

function part1 (lines) {
    return run(lines, findNrImmediateNeighbors, 4);
}

function part2 (lines) {
    return run(lines, findNrVisibleNeighbors, 5);
}

module.exports = { name, part1, part2 };
