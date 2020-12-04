const name = 'Report Repair';

function part1 (lines) {
    const numbers = lines.map(Number).sort();
    for (let i = 0; i < numbers.length - 1; ++i) {
        for (let j = i + 1; j < numbers.length; ++j) {
            if (numbers[i] + numbers[j] === 2020) {
                return numbers[i] * numbers[j];
            }
        }
    }

    return 0;
}

function part2 (lines) {
    const numbers = lines.map(Number).sort();
    for (let i = 0; i < numbers.length - 2; ++i) {
        for (let j = i + 1; j < numbers.length - 1; ++j) {
            for (let k = j + 1; k < numbers.length; ++k) {
                if (numbers[i] + numbers[j] + numbers[k] === 2020) {
                    return numbers[i] * numbers[j] * numbers[k];
                }
            }
        }
    }

    return 0;
}

module.exports = { name, part1, part2 };
