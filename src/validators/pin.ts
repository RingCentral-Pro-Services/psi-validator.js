import Validator from './validator';

class PinValidator extends Validator {
    sequentialRegex;
    repeatingRegex;
    numbersOnlyRegex;

    constructor() {
        super();
        this.sequentialRegex = new RegExp(/[^012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210]/, 'gm');
        this.repeatingRegex = new RegExp(/[^000|111|222|333|444|555|666|777|888|999]/, 'gm');
        this.numbersOnlyRegex = new RegExp(/\D/, 'gm');
    }

    toolTip() {
        return "PINs should be 8-32 characters long, not have 3 repeated numbers, or 3 sequential numbers";
    };

    validate(element: string): Promise<boolean> {
        let errors: any[] = [];
        element = element.toString();

        if (this.sequentialRegex.test(element)) {
            errors.push('PIN cannot contain 3 sequential numbers, like 123');
        };
        if (this.repeatingRegex.test(element)) {
            errors.push('PIN cannot contain 3 repeating numbers, like 111');
        };
        if (this.numbersOnlyRegex.test(element)) {
            errors.push('PINs can only contain numbers');
        };
        if (element.length < 6 || element.length > 10) {
            errors.push('PIN length must be between 6 and 10 digits');
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

export default PinValidator;