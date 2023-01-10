const { DnsValidator } = require('../dist/index');

const validator = new DnsValidator();

test('dns validate', async () => {
    expect(await validator.validate('https://www.ringcentral.com')).toBe(true);
});

test('validateMany', async () => {
    array = [
        'https://www.ringcentral.com',
        'https://www.google.com'
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true]);
});

test('bad domain fails', async () => {
    let result = await validator
        .validate('https://www.ringcentral.comX')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('badly formed fails', async () => {
    let result = await validator
        .validate('https:/www.ringcentral.com')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('badly formed and bad domain fails', async () => {
    let result = await validator
        .validate('http:/www.ringcentral.comX')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('ip address should fail', async () => {
    let result = await validator
        .validate('https://10.0.0.1')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('missing http(s)', async () => {
    let result = await validator
        .validate('www.google.com')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('missing http(s) and bad domain', async () => {
    let result = await validator
        .validate('www.google.comX')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});