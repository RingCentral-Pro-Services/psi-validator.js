const { IpValidator } = require('../dist/index');

const validator = new IpValidator();

test('IP validate', async () => {
    expect(await validator.validate('http://10.0.0.1')).toBe(true);
});

test('validateMany', async () => {
    array = [
        '10.0.0.1',
        'http://192.168.0.1',
        '10.0.0.0:3000'
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true, true]);
});

test('bad IP fails', async () => {
    let result = await validator
        .validate('1000.10.10.10')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('badly formed', async () => {
    let result = await validator
        .validate('httfs://10.0.0.1')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('badly formed', async () => {
    let result = await validator
        .validate('10.0.1110.100')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});
