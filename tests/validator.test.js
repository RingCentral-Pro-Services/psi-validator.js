const { Validator } = require('../dist/index');

const validator = new Validator();

test('toolTip', () => {
    expect(validator.toolTip()).toBeDefined();
});

test('validate', async () => {
    expect(await validator.validate('')).toBe(true);
});

test('validateMany', async () => {
    array = [
        '',
        ''
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true]);
});