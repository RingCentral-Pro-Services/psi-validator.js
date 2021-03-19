import Validator from './validator';
import EmailValidator from './email';

const emailValidator = new EmailValidator();

/**
 * Validator for Limited Extensions
 */
class LimitedExtensionContactValidator extends Validator {

    constructor() {
        super();
    };

    toolTip() {
        return "LE Contact Information";
    };

    async validate(element: any): Promise<boolean> {
        let errors: any[] = [];

        if (typeof (element) !== 'object') {
            errors.push(`Request is not an object, you sent ${typeof (element)}`);
        };

        if (element && element.lastName) {
            errors.push({
                lastName: `Limited Extensions can't have a last name`
            });
        };

        if (element && element.email) {
            let emailResponse = await emailValidator
                .validate(element.email)
                .then(res => {
                    return res;
                })
                .catch(e => {
                    return e;
                });

            if (emailResponse !== true) {
                errors.push({
                    email: emailResponse
                });
            };
        } else {
            errors.push(`Email address is required`);
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

export default LimitedExtensionContactValidator;