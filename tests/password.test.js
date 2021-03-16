const { PasswordValidator } = require('../dist/index');

const validator = new PasswordValidator();

test('password toolTip', () => {
    expect(validator.toolTip()).toBeDefined();
});

test('passowrd validate', async () => {
    expect(await validator.validate('P@ssw0rd')).toBe(true);
});

test('validateMany', async () => {
    array = [
        'P@ssw0rd1',
        'P@ssw0rd2'
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true]);
});

test('no special character or upper case', async () => {
    let result = await validator
        .validate('passw0rd')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('no number', async () => {
    let result = await validator
        .validate('Password')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('no letter', async () => {
    let result = await validator
        .validate('0123456789')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});


test('too short', async () => {
    let result = await validator
        .validate('P@ss')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('too long', async () => {
    let result = await validator
        .validate('P@ssw0rdP@ssw0rdP@ssw0rdP@ssw0rdP@ssw0rdP@ssw0rdP@ssw0rd')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});
