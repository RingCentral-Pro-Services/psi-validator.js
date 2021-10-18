import Validator from './validator';

/**
 * Validates that an element contains only numbers.
 */
class NumberValidator extends Validator {
    numberRegex: RegExp;

    constructor() {
        super();

        this.numberRegex = new RegExp(/^\d*$/);
    };

    /**
     * Validate an individual item. Return true, or information about a failed validation
     * 
     * @param element Element that we are validating
     * @returns true, or rejection that includes the original element, and an array of errors for it
     */
    validate(element: any): Promise<boolean> {
        let errors: any[] = [];

        if (this.numberRegex.test(element) == false) {
            errors.push('Not a number');
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

export default NumberValidator;