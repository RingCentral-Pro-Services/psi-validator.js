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
