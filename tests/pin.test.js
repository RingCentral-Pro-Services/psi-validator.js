const { PinValidator } = require('../dist/index');

const validator = new PinValidator();

test('pin toolTip', () => {
    expect(validator.toolTip()).toBeDefined();
});

test('pin validate', async () => {
    expect(await validator.validate('010203')).toBe(true);
});

test('validateMany', async () => {
    array = [
        '010203',
        '302010'
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true]);
});

test('repeating pin fails', async () => {
    let result = await validator
        .validate('111222')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('sequential ascending pin fails', async () => {
    let result = await validator
        .validate('012345')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('sequential descending pin fails', async () => {
    let result = await validator
        .validate('543210')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('short pin fails', async () => {
    let result = await validator
        .validate('0102')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('long pin fails', async () => {
    let result = await validator
        .validate('0102030405050607080910203040506070708090')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('non digit pin fails', async () => {
    let result = await validator
        .validate('Hello world!')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});