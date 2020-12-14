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
    const obj = {};
    prepareInput(lines)
        .forEach(([mask, instructions]) => {
            instructions
                .forEach(([addStr, valStr]) => {
                    obj[Number(addStr)] = parseInt(
                        Number(valStr)
                            .toString(2)
                            .padStart(mask.length, '0')
                            .split('')
                            .map((c, i) => (mask[i] === 'X' ? c : mask[i]))
                            .join(''),
                        2
                    );
                });
        });

    return Object.values(obj).reduce((acc, v) => acc + v, 0);
}

function part2 (lines) {
    const obj = {};

    const recurse = (addrArr, addresses) => {
        const i = addrArr.indexOf('X');
        if (i === -1) {
            addresses.push(parseInt(addrArr.join(''), 2));
            return addresses;
        }
        const arrCopy = addrArr.slice();
        arrCopy[i] = '0';
        recurse(arrCopy, addresses);
        arrCopy[i] = '1';
        recurse(arrCopy, addresses);
        return addresses;
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

                    const addresses = recurse(addrArr, []);
                    addresses.forEach((a) => {
                        obj[a] = Number(valStr);
                    });
                });
        });
    return Object.values(obj).reduce((acc, v) => acc + v, 0);
}

module.exports = { name, part1, part2 };
