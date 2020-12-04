const name = 'Passport Processing';

function filterValidFields (lines) {
    const reqFields = [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid'
    ];

    return lines.join('\n').split('\n\n')
        .filter((passport) => {
            const fieldsPairs = passport.split(/\s/);
            const fields = fieldsPairs.map((fp) => fp.split(':')[0]);
            return reqFields.reduce((acc, rqf) => acc && fields.includes(rqf), true);
        });
}

function part1 (lines) {
    return filterValidFields(lines).length;
}

function part2 (lines) {
    return filterValidFields(lines)
        .filter((passport) => {
            const fieldsPairs = passport.split(/\s/);
            let isValid = true;
            fieldsPairs.forEach((fp) => {
                const [f, v] = fp.split(':');
                switch (f) {
                case 'byr': isValid = isValid && Number(v) >= 1920 && Number(v) <= 2002; break;
                case 'iyr': isValid = isValid && Number(v) >= 2010 && Number(v) <= 2020; break;
                case 'eyr': isValid = isValid && Number(v) >= 2020 && Number(v) <= 2030; break;
                case 'hgt': {
                    const unit = v.slice(v.length - 2);
                    const val = Number(v.substr(0, v.length - 2));
                    isValid = isValid && ['in', 'cm'].includes(unit);

                    if (unit === 'in') isValid = isValid && val >= 59 && val <= 76;
                    if (unit === 'cm') isValid = isValid && val >= 150 && val <= 193;
                    break;
                }
                case 'hcl': isValid = isValid && (v.match(/^#[0-9a-f]{6}$/) !== null); break;
                case 'ecl': isValid = isValid
                                && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v);
                    break;
                case 'pid': isValid = isValid && (v.match(/^[0-9]{9}$/) !== null); break;
                default: // Do nothing
                }
            });
            return isValid;
        })
        .length;
}

module.exports = { name, part1, part2 };
