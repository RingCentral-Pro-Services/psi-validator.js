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
        .validate('0102030405')
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

test('no repeated numbers', async () => {
    let result = await validator
        .validate('P@ssw0rd111')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('no sequential numbers', async () => {
    let result = await validator
        .validate('P@ssw0rd123')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});


test('no repeated letters lowercase', async () => {
    let result = await validator
        .validate('P@ssw0rdaaa')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('no repeated letters uppercase', async () => {
    let result = await validator
        .validate('P@ssw0rdAAA')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('no repeated letters mixed-case', async () => {
    let result = await validator
        .validate('P@ssw0rdaAa')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('no sequential letters lowercase', async () => {
    let result = await validator
        .validate('P@ssw0rdabc')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('no sequential letters uppercase', async () => {
    let result = await validator
        .validate('P@ssw0rdABC')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});

test('no sequential letters mixed-case', async () => {
    let result = await validator
        .validate('P@ssw0rdAbC')
        .catch(e => { return e })

    expect(result).toHaveProperty('errors');
});