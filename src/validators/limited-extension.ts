import Validator from './validator';
import PinValidator from './pin';
import PasswordValidator from './password';
import LimitedExtensionContactValidator from './limited-extension-contact';

const leContactValidator = new LimitedExtensionContactValidator();
const pinValidator = new PinValidator();
const passwordValidator = new PasswordValidator();

/**
 * Validator for Limited Extensions
 */
class LimitedExtensionValidator extends Validator {

    constructor() {
        super();
    };

    async validate(element: any, method: 'post' | 'put'): Promise<boolean> {
        let errors: any[] = [];

        if (typeof (element) !== 'object') {
            errors.push(`Request is not an object, you sent ${typeof (element)}`);
        };

        if (element && !element.contact) {
            errors.push(`Limited Extensions requests require a contact object`);
        };

        if (element && element.contact) {
            let contactResponse = await leContactValidator
                .validate(element.contact)
                .then(res => {
                    return res;
                })
                .catch(e => {
                    return e;
                });

            if (contactResponse !== true) {
                errors.push({
                    contact: contactResponse
                });
            };
        };

        if (element && !element.ivrPin) {
            errors.push(`Limited Extension requests require a PIN`);
        };

        if (element && element.ivrPin) {
            let pinResponse = await pinValidator
                .validate(element.ivrPin)
                .then(res => {
                    return res;
                })
                .catch(e => {
                    return e;
                });

            if (pinResponse !== true) {
                errors.push({
                    ivrPin: pinResponse
                });
            };
        };

        if (element && !element.password) {
            errors.push(`Limited Extension requests require a password`);
        };

        if (element && element.password) {
            let passwordResponse = await passwordValidator
                .validate(element.password)
                .then(res => {
                    return res;
                })
                .catch(e => {
                    return e;
                });

            if (passwordResponse !== true) {
                errors.push({
                    password: passwordResponse
                });
            };
        };

        return new Promise((resolve, reject) => {
            if (errors.length > 0) {
                reject({
                    originalElement: element,
                    errors: errors
                });
            } else {
                resolve(true);
            };
        });
    };
};

export default LimitedExtensionValidator;