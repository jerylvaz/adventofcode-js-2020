const name = 'Docking Data';

function prepareInput (lines) {
    return lines.join('\n')
        .split(/\nmask = /)
        .map((group) => {
            const groupLines = group.split(/\n/);
            const mask = groupLines[0].replace('mask = ', '');
            const instructions = groupLines.slice(1)
                .map((l) => {
                    const [, addStr, valStr] = l.match(/(?:^mem\[)([0-9]+)\] = ([0-9]+)/);
                    return [addStr, valStr];
                });
            return [mask, instructions];
        });
}

function part1 (lines) {
    const memObj = {};
    prepareInput(lines)
        .forEach(([mask, instructions]) => {
            instructions
                .forEach(([addStr, valStr]) => {
                    const binStr = Number(valStr)
                        .toString(2)
                        .padStart(mask.length, '0')
                        .split('')
                        .map((c, i) => (mask[i] === 'X' ? c : mask[i]))
                        .join('');
                    memObj[Number(addStr)] = parseInt(binStr, 2);
                });
        });

    return Object.values(memObj).reduce((acc, v) => acc + v, 0);
}

function part2 (lines) {
    const memObj = {};

    const recurse = (addrArr, val) => {
        const i = addrArr.indexOf('X');
        if (i === -1) {
            memObj[parseInt(addrArr.join(''), 2)] = val;
            return;
        }
        const arrCopy = addrArr.slice();
        arrCopy[i] = '0';
        recurse(arrCopy, val);
        arrCopy[i] = '1';
        recurse(arrCopy, val);
    };

    prepareInput(lines)
        .forEach(([mask, instructions]) => {
            instructions
                .forEach(([addStr, valStr]) => {
                    const addrArr = Number(addStr)
                        .toString(2)
                        .padStart(mask.length, '0')
                        .split('')
                        .map((c, i) => (mask[i] === '0' ? c : mask[i]));

                    recurse(addrArr, Number(valStr));
                });
        });
    return Object.values(memObj).reduce((acc, v) => acc + v, 0);
}

module.exports = { name, part1, part2 };
