function get (arr, x, y, z, maxX, maxY, _maxZ) {
    return arr[z * maxY * maxX + y * maxX + x];
}

function set (arr, x, y, z, maxX, maxY, _maxZ, e) {
    // eslint-disable-next-line no-param-reassign
    arr[z * maxY * maxX + y * maxX + x] = e;
}

function findAllNeighbors (arr, x, y, z, maxX, maxY, maxZ, depth) {
    const xStart = Math.max(0, x - depth);
    const xEnd = Math.min(maxX, x + depth);
    const yStart = Math.max(0, y - depth);
    const yEnd = Math.min(maxY, y + depth);
    const zStart = Math.max(0, z - depth);
    const zEnd = Math.min(maxZ, z + depth);

    const neighbors = [];
    for (let i = xStart; i <= xEnd; ++i) {
        for (let j = yStart; j <= yEnd; ++j) {
            for (let k = zStart; k <= zEnd; ++k) {
                if (i !== x || j !== y || k !== z) {
                    neighbors.push(get(arr, i, j, k, maxX, maxY, maxZ));
                }
            }
        }
    }

    return neighbors;
}

// eslint-disable-next-line no-unused-vars
function print (arr, maxX, maxY, maxZ) {
    /* eslint-disable no-console */
    for (let z = 0; z < maxZ; ++z) {
        console.log(`z = ${z}`);
        for (let y = 0; y < maxY; ++y) {
            let str = '';
            for (let x = 0; x < maxX; ++x) {
                str += get(arr, x, y, z, maxX, maxY, maxZ);
            }
            console.log(str);
        }
        console.log();
    }
}

function pass (arr, maxX, maxY, maxZ) {
    const tmpArr = [...arr];
    for (let z = 0; z < maxZ; ++z) {
        for (let y = 0; y < maxY; ++y) {
            for (let x = 0; x < maxX; ++x) {
                const nrNeighbors = findAllNeighbors(tmpArr, x, y, z, maxX, maxY, maxZ, 1)
                    .filter((v) => v === '#')
                    .length;

                const e = get(arr, x, y, z, maxX, maxY, maxZ);
                const active = (e === '#' && [2, 3].includes(nrNeighbors))
                    || (e === '.' && nrNeighbors === 3);
                set(arr, x, y, z, maxX, maxY, maxZ, active ? '#' : '.');
            }
        }
    }
}

function solve (lines, nrPasses) {
    const maxX = lines.length + 2 * nrPasses;
    const maxY = lines.length + 2 * nrPasses;
    const maxZ = 1 + 2 * nrPasses;

    const arr = Array(maxX * maxY * maxZ).fill('.');
    const offset = maxX * maxY * nrPasses;
    const input = lines.join('').split('');

    for (let x = 0; x < lines.length; ++x) {
        for (let y = 0; y < lines.length; ++y) {
            arr[offset + (y + nrPasses) * maxY + x + nrPasses] = input[y * lines.length + x];
        }
    }

    for (let i = 0; i < nrPasses; ++i) {
        pass(arr, maxX, maxY, maxZ);
    }

    return arr.filter((e) => e === '#').length;
}

module.exports = { solve };
