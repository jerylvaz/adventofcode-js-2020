const name = 'Rain Risk';

const dirs = ['N', 'E', 'S', 'W'];

function part1 (lines) {
    let curDir = 'E';
    const pos = lines.map((l) => [l[0], Number(l.substr(1))])
        .reduce((acc, [d, v]) => {
            switch (d) {
            case 'E':
            case 'S':
            case 'W':
            case 'N': acc[d] += v; break;
            case 'F': acc[curDir] += v; break;
            case 'R': curDir = dirs[(dirs.indexOf(curDir) + v / 90) % dirs.length]; break;
            case 'L':
                curDir = dirs[(dirs.indexOf(curDir) + dirs.length - v / 90) % dirs.length]; break;
            default: break;
            }
            return acc;
        },
        // eslint-disable-next-line object-curly-newline
        { N: 0, E: 0, W: 0, S: 0 });

    return Math.abs(pos.N - pos.S) + Math.abs(pos.E - pos.W);
}

function part2 (lines) {
    const inst = lines.map((l) => [l[0], Number(l.substr(1))])
        .reduce((acc, [d, v]) => {
            switch (d) {
            case 'E':
            case 'S':
            case 'W':
            case 'N': acc.wp[d] += v; break;
            case 'F': dirs.forEach((x) => { acc.sh[x] += acc.wp[x] * v; }); break;
            case 'R':
                Array(v / 90).fill().forEach(() => {
                    [acc.wp.E, acc.wp.S,
                        acc.wp.W, acc.wp.N] = [acc.wp.N, acc.wp.E, acc.wp.S, acc.wp.W];
                });
                break;
            case 'L':
                Array(v / 90).fill().forEach(() => {
                    [acc.wp.W, acc.wp.N,
                        acc.wp.E, acc.wp.S] = [acc.wp.N, acc.wp.E, acc.wp.S, acc.wp.W];
                });
                break;
            default: break;
            }
            return acc;
        },
        // eslint-disable-next-line object-curly-newline
        { wp: { N: 1, E: 10, S: 0, W: 0 }, sh: { N: 0, E: 0, W: 0, S: 0 } });

    return Math.abs(inst.sh.N - inst.sh.S) + Math.abs(inst.sh.E - inst.sh.W);
}

module.exports = { name, part1, part2 };
