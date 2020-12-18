const name = 'Ticket Translation';

function isValid ([, min1, max1, min2, max2], n) {
    return (n >= min1 && n <= max1) || (n >= min2 && n <= max2);
}

function prepareInput (lines) {
    const [ruleLines, ticketLines, nearbyLines] = lines
        .join('\n').split('\n\n').map((l) => l.split('\n'));

    const rules = ruleLines
        .map((l) => {
            const [, ruleName, min1, max1, min2, max2] = l.match(
                /(.+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/
            );
            return [ruleName, Number(min1), Number(max1), Number(min2), Number(max2)];
        });

    return [
        rules,
        ticketLines[1].split(',').map(Number),
        nearbyLines.slice(1).map((l) => l.split(',').map(Number))
    ];
}

function part1 (lines) {
    const [rules, , nearbyTickets] = prepareInput(lines);
    return nearbyTickets
        .flatMap((tk) => tk.filter((n) => rules.every((rule) => !isValid(rule, n))))
        .reduce((acc, v) => acc + v, 0);
}

function part2 (lines) {
    const [rules, ticket, nearbyTickets] = prepareInput(lines);
    const filteredTickets = nearbyTickets
        .filter((tk) => tk.every((n) => rules.some((rule) => isValid(rule, n), n)));

    const fieldIndices = Array(ticket.length).fill().map((e, i) => i);

    return rules
        .map((rule) => [
            rule[0],
            fieldIndices.filter((col) => filteredTickets.every((tk) => isValid(rule, tk[col])))
        ])
        .sort(([, fields1], [, fields2]) => fields1.length - fields2.length)
        .map(
            function mapFunc ([rn, fields]) { // thisArg cannot be used with arrow function
                const unusedFieldId = fields.find((i) => !this.includes(i));
                this.push(unusedFieldId);
                return [rn, unusedFieldId];
            },
            [] // empty array as thisArg, used as list of identified indices
        )
        .filter(([rn]) => rn.startsWith('departure'))
        .map(([, field]) => ticket[field])
        .reduce((acc, v) => acc * v, 1);
}

module.exports = { name, part1, part2 };
