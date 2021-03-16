import Validator from './validator';

class PasswordValidator extends Validator {
    atLeastOneLetterRegex;
    atLeastOneNumberRegex;
    atLeastOneUpperOrSpecialRegex;

    constructor() {
        super();
        this.atLeastOneLetterRegex = new RegExp(/[a-zA-Z]{1,}/);
        this.atLeastOneNumberRegex = new RegExp(/\d{1,}/);
        this.atLeastOneUpperOrSpecialRegex = new RegExp(/[A-Z]{1,}|[!@#$%^&*]{1,}/);
    }

    toolTip() {
        return "Passwords require an upper case, lower case, number, and special character";
    };

    validate(element: string): Promise<boolean> {
        let errors: any[] = [];

        if (!this.atLeastOneLetterRegex.test(element)) {
            errors.push('Passwords require at least one letter');
        };
        if (!this.atLeastOneNumberRegex.test(element)) {
            errors.push('Passwords require at least one number');
        };
        if (!this.atLeastOneUpperOrSpecialRegex.test(element)) {
            errors.push('Passwords require at least one special or upper case character');
        };
        if (element.length < 8 || element.length > 32) {
            errors.push('Password length must be between 8 and 32 characters');
        };

        return new Promise((resolve, reject) => {
            if (errors.length > 0) {
                reject({
                    originalElement: element,
                    errors: errors
                })
            } else {
                resolve(true)
            }
        })
    };
};

export default PasswordValidator;