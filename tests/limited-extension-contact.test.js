const { LimitedExtensionContactValidator } = require('../dist/index');

const validator = new LimitedExtensionContactValidator();

test('LE Contact toolTip', () => {
    expect(validator.toolTip()).toBeDefined();
});

test('LE Contact validates', async () => {
    let contactBody = {
        firstName: "John Celoria",
        email: "john.celoria@ringcentral.com"
    }

    expect(await validator.validate(contactBody)).toBe(true);
});

test('validateMany', async () => {
    array = [
        {
            firstName: "John Celoria",
            email: "john.celoria@ringcentral.com"
        },
        {
            firstName: "Kyle Cleveland",
            email: "kyle.cleveland@ringcentral.com"
        }
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true]);
});

test('bad domain fails', async () => {
    let contactBody = {
        firstName: "John Celoria",
        email: "john.celoria@ringcentral.comX"
    }

    let result = await validator
        .validate(contactBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('no first name fails', async () => {
    let contactBody = {
        email: "john.celoria@ringcentral.com"
    }

    let result = await validator
        .validate(contactBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('last name fails', async () => {
    let contactBody = {
        firstName: "John",
        lastName: "Celoria",
        email: "john.celoria@ringcentral.com"
    }

    let result = await validator
        .validate(contactBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('lastname and email fails', async () => {
    let contactBody = {
        firstName: "John",
        lastName: "Celoria",
        email: "john.celoria@ringcentral.comX"
    }

    let result = await validator
        .validate(contactBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('empty object fails', async () => {
    let contactBody = {}

    let result = await validator
        .validate(contactBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('undefined fails', async () => {
    let contactBody = undefined

    let result = await validator
        .validate(contactBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('string fails', async () => {
    let contactBody = ""

    let result = await validator
        .validate(contactBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});
