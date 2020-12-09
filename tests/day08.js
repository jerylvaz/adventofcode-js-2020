module.exports = {
    both: [
        {
            input: [
                'nop +0',
                'acc +1',
                'jmp +4',
                'acc +3',
                'jmp -3',
                'acc -99',
                'acc +1',
                'jmp -4',
                'acc +6'
            ],
            output1: 5,
            output2: 8
        }
    ]
};
