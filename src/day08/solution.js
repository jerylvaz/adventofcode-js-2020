const name = 'Handheld Halting';

function run (instructions) {
    const instructionsCopy = instructions.slice(0);
    let acc = 0;
    for (let i = 0; i < instructionsCopy.length; ++i) {
        const [inst, val] = instructionsCopy[i].split(' ');
        const iCopy = i;
        switch (inst) {
        case 'acc': acc += Number(val); break;
        case 'jmp': i += Number(val) - 1; break;
        case '-': return { acc, infiniteLoop: true };
        case 'nop':
        default: break;
        }
        instructionsCopy[iCopy] = '-';
    }
    return { acc, infiniteLoop: false };
}

function part1 (lines) {
    return run(lines).acc;
}

function part2 (lines) {
    for (let i = 0; i < lines.length; ++i) {
        const linesCopy = lines.slice(0);
        linesCopy[i] = linesCopy[i].replace(/^jmp/, '#nop').replace(/^nop/, '#jmp').replace('#', '');
        const res = run(linesCopy);
        if (!res.infiniteLoop) return res.acc;
    }
    return -1;
}

module.exports = { name, part1, part2 };
