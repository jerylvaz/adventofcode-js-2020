const name = 'Operation Order';

function evalLeftToRight (str) {
    const tokens = str.split(/\s/);

    let acc = Number(tokens.shift());
    while (tokens.length > 0) {
        const operator = tokens.shift();
        const val = Number(tokens.shift());
        acc = (operator === '+') ? (acc + val) : (acc * val);
    }
    return acc;
}

function evalAddFirst (str) {
    let addExp = null;
    // eslint-disable-next-line no-cond-assign
    while (addExp = str.match(/[0-9]+\s\+\s[0-9]+/)) {
        const [op1, , op2] = addExp[0].split(/\s/);
        // eslint-disable-next-line no-param-reassign
        str = str.replace(addExp[0], `${Number(op1) + Number(op2)}`);
    }
    return evalLeftToRight(str);
}

function solve (lines, evalFunc) {
    return lines
        .map((line) => {
            let parenthExp = null;
            // eslint-disable-next-line no-cond-assign
            while (parenthExp = line.match(/\([0-9+*\s]+\)/)) {
                const val = evalFunc(parenthExp[0].replace(/[()]/g, ''));
                // eslint-disable-next-line no-param-reassign
                line = line.replace(parenthExp[0], `${val}`);
            }

            return evalFunc(line);
        })
        .reduce((acc, v) => acc + v, 0);
}

function part1 (lines) {
    return solve(lines, evalLeftToRight);
}

function part2 (lines) {
    return solve(lines, evalAddFirst);
}

module.exports = { name, part1, part2 };
