const name = 'Lobby Layout';

// Using doubled co-ordinates from https://www.redblobgames.com/grids/hexagons/

function findInitialLayout (lines) {
    const blacks = new Set();
    lines
        .forEach((line) => {
            let x = 0;
            let y = 0;
            for (let i = 0; i < line.length; ++i) {
                let dir = line[i];
                if (['s', 'n'].includes(dir)) {
                    i += 1;
                    dir += line[i];
                }

                switch (dir) {
                case 'e': x += 2; break;
                case 'w': x -= 2; break;
                case 'se': x += 1; y += 1; break;
                case 'sw': x -= 1; y += 1; break;
                case 'ne': x += 1; y -= 1; break;
                case 'nw': x -= 1; y -= 1; break;
                default: // do nothing
                }
            }
            const tile = `${x},${y}`;
            if (blacks.has(tile)) {
                blacks.delete(tile);
            } else {
                blacks.add(tile);
            }
        });
    return blacks;
}

function part1 (lines) {
    const blacks = findInitialLayout(lines);
    return blacks.size;
}

function part2 (lines) {
    const DAYS = 100;
    const blacks = findInitialLayout(lines);

    const arr = Array.from(blacks).map((l) => l.split(',').map(Number));
    const xes = arr.map(([x]) => x);
    const yes = arr.map(([, y]) => y);
    const minX = Math.min(...xes) - DAYS;
    const minY = Math.min(...yes) - DAYS;
    const maxX = Math.max(...xes) + DAYS;
    const maxY = Math.max(...yes) + DAYS;

    let tiles = new Map();
    for (let x = minX; x <= maxX; ++x) {
        for (let y = minY; y <= maxY; ++y) {
            if ((x + y) % 2 === 0) {
                const tile = `${x},${y}`;
                tiles.set(tile, blacks.has(tile));
            }
        }
    }

    for (let i = 0; i < DAYS; ++i) {
        const newTiles = new Map();
        tiles.forEach((isBlack, tile, tls) => {
            const [x, y] = tile.split(',').map(Number);
            const neighbors = [
                `${x - 1},${y - 1}`, `${x + 1},${y - 1}`,
                `${x + 1},${y + 1}`, `${x - 1},${y + 1}`,
                `${x - 2},${y}`, `${x + 2},${y}`
            ];
            const blackCount = neighbors
                .filter((n) => tls.get(n))
                .length;

            const newValue = isBlack ? !((blackCount === 0 || blackCount > 2)) : (blackCount === 2);
            newTiles.set(tile, newValue);
        });
        tiles = newTiles;
    }

    return Array.from(tiles.values()).filter(Boolean).length;
}

module.exports = { name, part1, part2 };
