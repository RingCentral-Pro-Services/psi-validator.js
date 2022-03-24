const { NumberValidator } = require('../dist/index');

const validator = new NumberValidator();

test('number validate', async () => {
    expect(await validator.validate(123)).toBe(true);
});

test('validateMany', async () => {
    array = [
        123,
        '321'
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true]);
});

test('not number fails', async () => {
    let result = await validator
        .validate('Hello World!')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('numbers and letters fails', async () => {
    let result = await validator
        .validate('Hello 123 World')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('undedined fails', async () => {
    let result = await validator
        .validate()
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});