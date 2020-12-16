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

    const nrRules = rules.length;
    const identifiedRules = []; // rule name and field tuples array
    const fieldIndices = Array(ticket.length).fill().map((e, i) => i);

    while (identifiedRules.length < nrRules) {
        // filter for current rule set
        const filteredTickets = nearbyTickets
            .filter((tk) => tk.every((n) => rules.some((rule) => isValid(rule, n), n)));

        rules
            .forEach((rule, idx) => {
                const fields = fieldIndices
                    .filter((col) => filteredTickets.every((tk) => isValid(rule, tk[col])));

                if (fields.length === 1) {
                    identifiedRules.push([rule[0], fields[0]]);
                    rules.splice(idx, 1); // this also terminates rules.forEach()
                    fieldIndices.splice(fieldIndices.indexOf(fields[0]), 1);
                }
            });
    }

    return identifiedRules
        .filter(([rn]) => rn.startsWith('departure'))
        .map(([, field]) => ticket[field])
        .reduce((acc, v) => acc * v, 1);
}

module.exports = { name, part1, part2 };
