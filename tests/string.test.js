const { StringValidator } = require('../dist/index');

const validator = new StringValidator();

test('string validate', async () => {
    expect(await validator.validate("Hello world")).toBe(true);
});

test('validateMany', async () => {
    array = [
        "Hello world",
        "Hi RC ProServ!"
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true]);
});

test('not string fails', async () => {
    let result = await validator
        .validate(123)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('undefined fails', async () => {
    let result = await validator
        .validate()
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('null fails', async () => {
    let result = await validator
        .validate(null)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});