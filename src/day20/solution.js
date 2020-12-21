const name = 'Jurassic Jigsaw';

class Tile {
    constructor (tileText) {
        const lines = tileText.split('\n');

        this.title = Number(lines.shift().match(/([0-9]+):$/)[1]);
        this.matrix = lines.map((l) => l.split(''));

        this.updateEdges();
    }

    rotate () {
        this.matrix = this.matrix[0].map((_x, i) => this.matrix.map((y) => y[i]).reverse());
        this.updateEdges();
    }

    flipV () {
        this.matrix = this.matrix.reverse();
        this.updateEdges();
    }

    flipH () {
        this.matrix = this.matrix.map((l) => l.reverse());
        this.updateEdges();
    }

    findEdgeMatches (t) {
        const matches = [];
        ['N', 'E', 'S', 'W'].forEach((d1) => {
            ['N', 'E', 'S', 'W'].forEach((d2) => {
                if (this[d1] === t[d2]) matches.push([d1, d2]);
                if (this[d1] === t[`${d2}R`]) matches.push([d1, `${d2}R`]);
            });
        });
        return matches;
    }

    updateEdges () {
        this.N = this.matrix[0].join('');
        this.NR = this.N.split('').reverse().join('');
        this.S = this.matrix[this.matrix.length - 1].join('');
        this.SR = this.S.split('').reverse().join('');
        this.W = this.matrix.map((l) => l[0]).join('');
        this.WR = this.W.split('').reverse().join('');
        this.E = this.matrix.map((l) => l[l.length - 1]).join('');
        this.ER = this.E.split('').reverse().join('');
    }

    toString () {
        return this.matrix.map((row) => row.join('')).join('');
    }
}

function solveJigsaw (lines) {
    const tiles = lines
        .join('\n')
        .split('\n\n')
        .map((tileText) => new Tile(tileText));

    const findNextE = (tile) => {
        let next = null;
        for (let i = 0; i < tiles.length && !next; ++i) {
            if (tile.E === tiles[i].W) {
                next = tiles[i];
            } else if (tile.ER === tiles[i].W) {
                tiles[i].flipV();
                next = tiles[i];
            } else if (tile.E === tiles[i].S) {
                tiles[i].rotate();
                next = tiles[i];
            } else if (tile.ER === tiles[i].S) {
                tiles[i].flipH();
                tiles[i].rotate();
                next = tiles[i];
            } else if (tile.E === tiles[i].E) {
                tiles[i].flipH();
                next = tiles[i];
            } else if (tile.ER === tiles[i].E) {
                tiles[i].flipV();
                tiles[i].flipH();
                next = tiles[i];
            } else if (tile.E === tiles[i].N) {
                tiles[i].flipV();
                tiles[i].rotate();
                next = tiles[i];
            } else if (tile.ER === tiles[i].N) {
                tiles[i].flipH();
                tiles[i].flipV();
                tiles[i].rotate();
                next = tiles[i];
            }
        }

        if (next) {
            tiles.splice(tiles.findIndex((t) => t.title === next.title), 1);
        }
        return next;
    };

    // find tiles with 2 unmatched edges (corners)
    const tilesWith2UnmatchedEdges = tiles
        .map((tile) => {
            const matchCount = tiles
                .filter((t) => tile.title !== t.title)
                .map((t) => tile.findEdgeMatches(t).length)
                .reduce((acc, v) => acc + v, 0);
            return [tile, matchCount];
        })
        .filter(([, mc]) => mc === 2)
        .map(([tile]) => tile);

    // take one of them as start tile
    const startTile = tilesWith2UnmatchedEdges[0];
    tiles.splice(tiles.findIndex((t) => t.title === startTile.title), 1);

    // orient start tile such that N and W edges are unmatched
    let startTileOriented = false;
    while (!startTileOriented) {
        startTile.rotate();
        const NMatches = tiles
            .filter((t) => [t.N, t.E, t.S, t.W, t.NR, t.ER, t.SR, t.WR].includes(startTile.N))
            .length;
        const WMatches = tiles
            .filter((t) => [t.N, t.E, t.S, t.W, t.NR, t.ER, t.SR, t.WR].includes(startTile.W))
            .length;
        startTileOriented = (NMatches === 0 && WMatches === 0);
    }

    const findRowForTile = (tile) => {
        const row = [];
        let curTile = tile;
        while (curTile) {
            row.push(curTile);
            curTile = findNextE(curTile);
        }
        return row;
    };

    const firstRow = findRowForTile(startTile);

    // rotate each tile in first row and use as first column
    const puzzle = firstRow
        .map((t) => {
            t.flipV();
            t.rotate();
            return findRowForTile(t);
        });

    return puzzle;
}

function part1 (lines) {
    const puzzle = solveJigsaw(lines);
    return puzzle[0][0].title
        * puzzle[0][puzzle.length - 1].title
        * puzzle[puzzle.length - 1][0].title
        * puzzle[puzzle.length - 1][puzzle.length - 1].title;
}

function part2 (lines) {
    const puzzle = solveJigsaw(lines);

    // remove borders
    for (let i = 0; i < puzzle.length; ++i) {
        for (let j = 0; j < puzzle.length; ++j) {
            const tile = puzzle[i][j];
            tile.matrix.shift();
            tile.matrix.pop();
            tile.matrix.forEach((r) => { r.shift(); r.pop(); });
        }
    }

    // merge into single tile
    const puzzleTextRows = ['Tile 0:'];
    for (let i = 0; i < puzzle.length; ++i) {
        for (let tr = 0; tr < puzzle[0][0].matrix.length; ++tr) {
            let line = '';
            for (let j = 0; j < puzzle.length; ++j) {
                line += puzzle[i][j].matrix[tr].join('');
            }
            puzzleTextRows.push(line);
        }
    }
    const mergedTile = new Tile(puzzleTextRows.join('\n'));

    const pattern = [
        '..................#.',
        '#....##....##....###',
        '.#..#..#..#..#..#'
    ];
    const re = new RegExp(`${pattern[0]}.{${puzzleTextRows[1].length - pattern[0].length}}`
        + `${pattern[1]}.{${puzzleTextRows[1].length - pattern[1].length}}${pattern[2]}`, 'g');

    // try all combinations
    let monsters = null;
    for (let i = 0; i < 4; ++i) {
        monsters = mergedTile.toString().match(re);
        if (monsters) break;
        mergedTile.rotate();
        monsters = mergedTile.toString().match(re);
        if (monsters) break;
        mergedTile.flipH();
        monsters = mergedTile.toString().match(re);
        if (monsters) break;
        mergedTile.flipV();
        monsters = mergedTile.toString().match(re);
        if (monsters) break;
    }

    const hashesInMonster = pattern.join('').split('').filter((c) => c === '#').length;
    const totalHashes = mergedTile.toString().split('').filter((c) => c === '#').length;

    return totalHashes - monsters.length * hashesInMonster;
}

module.exports = { name, part1, part2 };
