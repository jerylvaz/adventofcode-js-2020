const name = 'Custom Customs';

function part1 (lines) {
    return lines.join('\n').split('\n\n')
        .map((line) => line
            .replace(/\s/g, '')
            .split('')
            .filter((c, i, ls) => ls.indexOf(c) === i)
            .length)
        .reduce((acc, val) => acc + val, 0);
}

function part2 (lines) {
    return lines.join('\n').split('\n\n')
        .map((line) => {
            const allAnswers = line.split('\n').map((ans) => ans.split(''));
            return line
                .replace(/\s/g, '')
                .split('')
                .filter((c, i, ls) => ls.indexOf(c) === i)
                .map((ch) => allAnswers.reduce((acc, ans) => acc && ans.includes(ch), true))
                .filter((b) => b)
                .length;
        })
        .reduce((acc, val) => acc + val, 0);
}

module.exports = { name, part1, part2 };
