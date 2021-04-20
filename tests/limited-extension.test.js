const { LimitedExtensionValidator } = require('../dist/index');

const validator = new LimitedExtensionValidator();

test('LE toolTip', () => {
    expect(validator.toolTip()).toBeDefined();
});

test('LE validates', async () => {
    let leBody = {
        contact: {
            firstName: "John Celoria",
            email: "john.celoria@ringcentral.com"
        },
        password: "P@ssw0rd",
        ivrPin: "010203"
    }

    expect(await validator.validate(leBody)).toBe(true);
});

test('validateMany', async () => {
    array = [
        {
            contact: {
                firstName: "John Celoria",
                email: "john.celoria@ringcentral.com"
            },
            password: "P@ssw0rd",
            ivrPin: "010203"
        },
        {
            contact: {
                firstName: "Kyle Cleveland",
                email: "kyle.cleveland@ringcentral.com"
            },
            password: "P@ssw0rd1",
            ivrPin: "302010"
        }
    ];

    expect(await validator.validateMany(array)).toStrictEqual([true, true]);
});

test('not an object fails', async () => {
    let leBody = "Hello world!"

    let result = await validator
        .validate(leBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('no contact object fails', async () => {
    let leBody = {
        password: "P@ssw0rd",
        ivrPin: "010203"
    }

    let result = await validator
        .validate(leBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('bad email field fails', async () => {
    let leBody = {
        contact: {
            firstName: "John Celoria",
            email: "john.celoria@ringcentral.comX"
        },
        password: "P@ssw0rd",
        ivrPin: "010203"
    }

    let result = await validator
        .validate(leBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('last name field fails', async () => {
    let leBody = {
        contact: {
            firstName: "John",
            lastName: "Celoria",
            email: "john.celoria@ringcentral.com"
        },
        password: "P@ssw0rd",
        ivrPin: "010203"
    }

    let result = await validator
        .validate(leBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('no password field fails', async () => {
    let leBody = {
        contact: {
            firstName: "John Celoria",
            email: "john.celoria@ringcentral.com"
        },
        ivrPin: "010203"
    }

    let result = await validator
        .validate(leBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('bas password fails', async () => {
    let leBody = {
        contact: {
            firstName: "John Celoria",
            email: "john.celoria@ringcentral.com"
        },
        password: "password",
        ivrPin: "010203"
    }

    let result = await validator
        .validate(leBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('no ivrPin field fails', async () => {
    let leBody = {
        contact: {
            firstName: "John Celoria",
            email: "john.celoria@ringcentral.com"
        },
        password: "P@ssw0rd"
    }

    let result = await validator
        .validate(leBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('bad pin fails', async () => {
    let leBody = {
        contact: {
            firstName: "John Celoria",
            email: "john.celoria@ringcentral.com"
        },
        password: "P@ssw0rd",
        ivrPin: "123"
    }

    let result = await validator
        .validate(leBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});

test('no ping field fails', async () => {
    let leBody = {
        contact: {
            firstName: "John Celoria",
            email: "john.celoria@ringcentral.com"
        },
        password: "P@ssw0rd"
    }

    let result = await validator
        .validate(leBody)
        .catch(e => { return e });

    expect(result).toHaveProperty('errors');
});