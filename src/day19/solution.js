const name = 'Monster Messages';

function createRuleMap (rulesLines) {
    const ruleMap = new Map();
    rulesLines
        .split('\n')
        .map((rule) => rule.split(': '))
        .forEach(([ruleNr, rule]) => ruleMap.set(ruleNr, rule));
    return ruleMap;
}

function expandRule (rule, ruleMap) {
    return rule
        .split(/\s/)
        .map((token) => {
            if (['|', '+', '(', ')'].includes(token)) return token;
            if (token.match(/"[a-z]"/)) return token.replace(/"/g, '');
            return `( ${expandRule(ruleMap.get(token), ruleMap)} )`;
        })
        .join(' ');
}

function part1 (lines) {
    const [rulesLines, inputLines] = lines.join('\n').split('\n\n');

    const ruleMap = createRuleMap(rulesLines);

    const rule0 = expandRule(ruleMap.get('0'), ruleMap)
        .replace(/\( ([ab]) \)/g, '$1')
        .replace(/\s/g, '');

    return inputLines
        .split('\n')
        .filter((line) => line.match(new RegExp(`^${rule0}$`)))
        .length;
}

function part2 (lines) {
    const [rulesLines, inputLines] = lines.join('\n').split('\n\n');

    const ruleMap = createRuleMap(rulesLines);

    ruleMap.set('8', '( ( 42 ) + )');

    let rule11 = '( 42 31';
    for (let i = 2; i < 10; ++i) {
        rule11 += ` | ${Array(i).fill('42').join(' ')} ${Array(i).fill('31').join(' ')}`;
    }
    rule11 += ' )';
    ruleMap.set('11', rule11);

    const rule0 = expandRule(ruleMap.get('0'), ruleMap)
        .replace(/\( ([ab]) \)/g, '$1')
        .replace(/\s/g, '');

    return inputLines
        .split('\n')
        .filter((line) => line.match(new RegExp(`^${rule0}$`)))
        .length;
}

module.exports = { name, part1, part2 };
