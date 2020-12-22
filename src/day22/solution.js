const name = 'Crab Combat';

function prepareInput (lines) {
    return lines
        .join('\n')
        .split('\n\n')
        .map((p) => {
            const cards = p.split('\n');
            cards.shift();
            return cards.map(Number);
        });
}

function calculateScore (deck) {
    return deck
        .reverse()
        .reduce((acc, v, idx) => acc + v * (idx + 1), 0);
}

function part1 (lines) {
    const [p1, p2] = prepareInput(lines);

    while (p1.length && p2.length) {
        const c1 = p1.shift();
        const c2 = p2.shift();
        if (c1 > c2) {
            p1.push(c1, c2);
        } else {
            p2.push(c2, c1);
        }
    }

    return calculateScore(p1.length ? p1 : p2);
}

function part2 (lines) {
    const [p1, p2] = prepareInput(lines);

    const game = (deck1, deck2) => {
        const prevRounds = new Set();
        while (deck1.length && deck2.length) {
            const round = `${deck1.join(',')}+${deck2.join(',')}`;
            if (prevRounds.has(round)) {
                return 'P1';
            }
            prevRounds.add(round);

            let winner = null;
            const c1 = deck1.shift();
            const c2 = deck2.shift();
            if (deck1.length >= c1 && deck2.length >= c2) {
                winner = game(deck1.slice(0, c1), deck2.slice(0, c2));
            } else {
                winner = (c1 > c2) ? 'P1' : 'P2';
            }

            if (winner === 'P1') {
                deck1.push(c1, c2);
            } else {
                deck2.push(c2, c1);
            }
        }

        return deck1.length ? 'P1' : 'P2';
    };

    game(p1, p2);
    return calculateScore(p1.length ? p1 : p2);
}

module.exports = { name, part1, part2 };
