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

    while (identifiedRules.length < nrRules) {
        // filter tickets based on current rule set
        const fieldValues = Array(nrRules).fill().map(() => Array(0));
        nearbyTickets
            .filter((tk) => tk.every((n) => rules.some((rule) => isValid(rule, n), n)))
            .forEach((tk) => tk.forEach((n, idx) => {
                fieldValues[idx].push(n);
            }));

        const identifiedFields = identifiedRules.map((r) => r[1]);
        rules
            .slice(0) // copy so as to mutate rules inside forEach()
            .forEach((rule, idx) => {
                const fieldIdxs = fieldValues
                    .map((g, i) => [g, i])
                    .filter(([g]) => g.every((n) => isValid(rule, n)))
                    .map(([, i]) => i)
                    .filter((i) => !identifiedFields.includes(i));

                if (fieldIdxs.length === 1) {
                    identifiedRules.push([rule[0], fieldIdxs[0]]);
                    rules.splice(idx, 1);
                }
            });
    }

    return identifiedRules
        .filter(([rn]) => rn.startsWith('departure'))
        .map(([, field]) => ticket[field])
        .reduce((acc, v) => acc * v, 1);
}

module.exports = { name, part1, part2 };
