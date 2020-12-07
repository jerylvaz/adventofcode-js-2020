const name = 'Handy Haversacks';

function getBags (rules, color) {
    const colors = [];
    rules
        .filter((l) => l.includes(` ${color}`))
        .map((l) => l.split(' ').slice(0, 2).join(' '))
        .forEach((c) => {
            if (!colors.includes(c)) {
                colors.push(c, ...getBags(rules, c));
            }
        });
    return colors.filter((c, i, ls) => ls.indexOf(c) === i);
}

function getBagCount (rules, color) {
    const containedBags = rules
        .find((x) => x.match(new RegExp(`^${color}`)))
        .match(/[0-9]+ [a-z]+ [a-z]+/g) || [];
    return containedBags
        .map((x) => [Number(x.split(' ')[0]), x.replace(/[0-9]+ /, '')])
        .reduce((acc, [nr, clr]) => acc + nr + nr * getBagCount(rules, clr), 0);
}

function part1 (lines) {
    return getBags(lines, 'shiny gold').length;
}

function part2 (lines) {
    return getBagCount(lines, 'shiny gold');
}

module.exports = { name, part1, part2 };
