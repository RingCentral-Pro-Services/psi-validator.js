const { EmailValidator } = require('../dist/index');

const validator = new EmailValidator();

test('email validate', async () => {
    expect(await validator.validate('john.celoria@ringcentral.com')).toBe(true);
});

test('validateMany', async () => {
    array = [
        'john.celoria@ringcentral.com',
        'tyler.doyle@ringcentral.com'
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true]);
});

test('bad domain fails', async () => {
    let result = await validator
        .validate('john.celoria@ringcentral.comX')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('badly formed fails', async () => {
    let result = await validator
        .validate('john.celoria!ringcentral.com')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('badly formed and bad domain fails', async () => {
    let result = await validator
        .validate('john.celoria!ringcentral.comX')
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});
