const name = 'Binary Boarding';

function seatId (line) {
    const row = parseInt(line.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
    const col = parseInt(line.substr(7).replace(/L/g, '0').replace(/R/g, '1'), 2);
    return row * 8 + col;
}

function part1 (lines) {
    return Math.max(...lines.map(seatId));
}

function part2 (lines) {
    const seats = lines.map(seatId).sort((a, b) => a - b);
    for (let i = 0; i < seats.length - 1; ++i) {
        if (seats[i] + 1 !== seats[i + 1]) {
            return seats[i] + 1;
        }
    }

    return 0;
}

module.exports = { name, part1, part2 };
