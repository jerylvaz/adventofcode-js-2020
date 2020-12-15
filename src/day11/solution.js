const name = 'Seating System';

function eq (v) {
    return (x) => x === v;
}

function findAllNeighbors (arr, width, idx, depth) {
    const row = Math.floor(idx / width);
    const col = idx % width;
    const height = arr.length / width;
    const dpt = depth || Math.max(width, height);

    return [
        /* E  */ Array(Math.min(dpt, width - col - 1)).fill().map((e, i) => idx + i + 1),
        /* W  */ Array(Math.min(dpt, col)).fill().map((e, i) => idx - i - 1),
        /* N  */ Array(Math.min(dpt, row)).fill().map((e, i) => idx - (i + 1) * width),
        /* S  */ Array(Math.min(dpt, height - row - 1)).fill().map((e, i) => idx + (i + 1) * width),
        /* NE */ Array(Math.min(dpt, row, (width - col - 1))).fill()
            .map((e, i) => idx - (i + 1) * (width - 1)),
        /* SE */ Array(Math.min(dpt, height - row - 1, (width - col - 1))).fill()
            .map((e, i) => idx + (i + 1) * (width + 1)),
        /* SW */ Array(Math.min(dpt, height - row - 1, col)).fill()
            .map((e, i) => idx + (i + 1) * (width - 1)),
        /* NW */ Array(Math.min(dpt, row, col)).fill().map((e, i) => idx - (i + 1) * (width + 1))
    ]
        .map((dirArray) => dirArray.map((i) => arr[i]));
}

function findNrImmediateNeighbors (arr, width, idx) {
    return findAllNeighbors(arr, width, idx, 1)
        .map((dirArray) => dirArray.shift())
        .filter(eq('#'))
        .length;
}

function findNrVisibleNeighbors (arr, width, idx) {
    return findAllNeighbors(arr, width, idx, 0)
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
