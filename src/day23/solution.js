const name = 'Crab Cups';

// Always positive modulo
function mod (a, n) {
    return ((a % n) + n) % n;
}

// Less performant, yet simple
function part1 (lines) {
    const cups = lines[0].split('').map(Number);
    const len = cups.length;
    for (let i = 0; i < 100; ++i) {
        const cur = i % len;
        let dest = cups[cur];

        const picked = cups.splice(cur + 1, 3);
        const moreToPick = 3 - picked.length;
        if (moreToPick) {
            picked.push(...cups.splice(0, moreToPick));
        }

        do {
            dest = mod(dest - 2, len) + 1;
        } while (picked.includes(dest));
        const insertIndex = cups.indexOf(dest);

        cups.splice(insertIndex + 1, 0, ...picked);
        if (insertIndex < cur) {
            cups.push(...cups.splice(0, 3 - moreToPick));
        }
    }

    while (cups[0] !== 1) {
        cups.push(cups.shift());
    }

    return Number(cups.slice(1).join(''));
}

function part2 (lines) {
    let cups = lines[0].split('').map(Number);
    for (let i = 10; i <= 1e6; ++i) {
        cups.push(i);
    }
    cups = cups
        .map((v, i, arr) => (
            {
                value: v,
                next: mod(i + 1, arr.length)
            }
        ));
    const len = cups.length;

    let cur = cups[0];
    for (let i = 0; i < 1e7; ++i) {
        let dest = cur.value;

        const ptrToPick1 = cur.next;
        const pick1 = cups[cur.next];
        const pick2 = cups[pick1.next];
        const pick3 = cups[pick2.next];
        cur.next = pick3.next;

        const pickedValues = [pick1.value, pick2.value, pick3.value];

        do {
            dest = mod(dest - 2, len) + 1;
        } while (pickedValues.includes(dest));

        const insert = (dest < 10) ? cups.find(({ value }) => value === dest) : cups[dest - 1];

        pick3.next = insert.next;
        insert.next = ptrToPick1;

        cur = cups[cur.next];
    }

    const cupOne = cups.find(({ value }) => value === 1);
    return cups[cupOne.next].value * cups[cups[cupOne.next].next].value;
}

module.exports = { name, part1, part2 };
