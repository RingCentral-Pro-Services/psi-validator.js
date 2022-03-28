import Validator from './validator';
import numbers from '../lib/numbers';

/**
 * RingCentral IVRPin. This is generally used for checking voicemail from a physical device endpoint. 
 * 
 * https://support.ringcentral.com/article/5766.html
 */
class PinValidator extends Validator {
    sequentialNumbersRegex;
    repeatingNumbersRegex;
    numbersOnlyRegex;

    constructor() {
        super();
        this.sequentialNumbersRegex = this.createSequentialNumbersRegex();
        this.repeatingNumbersRegex = this.createRepeatedNumbersRegex();
        this.numbersOnlyRegex = new RegExp(/\D/, '');
    };

    validate(element: string): Promise<boolean> {
        let errors: any[] = [];

        if (this.sequentialNumbersRegex.test(element)) {
            errors.push('PIN cannot contain 3 sequential numbers, like 123');
        }
        if (this.repeatingNumbersRegex.test(element)) {
            errors.push('PIN cannot contain 3 repeating numbers, like 111');
        }
        if (this.numbersOnlyRegex.test(element)) {
            errors.push('PINs can only contain numbers');
        }
        if (element.length < 6 || element.length > 10) {
            errors.push('PIN length must be between 6 and 10 digits');
        }

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

    createRepeatedNumbersRegex() {
        let repeatedNumArr = [];

        for (let i = 0; i < numbers.length; i++) {
            repeatedNumArr.push(numbers[i] + numbers[i] + numbers[i]);
        };

        return new RegExp("(" + repeatedNumArr.join('|') + ")", "i");
    };

    createSequentialNumbersRegex() {
        let sequentialNumbersArray = [];

        for (let i = 0; i < numbers.length; i++) {
            if (i == 0 || i == numbers.length - 1) { continue };
            sequentialNumbersArray.push(numbers[i - 1] + numbers[i] + numbers[i + 1]);
        };

        numbers.reverse();

        for (let i = 0; i < numbers.length; i++) {
            if (i == 0 || i == numbers.length - 1) { continue };
            sequentialNumbersArray.push(numbers[i - 1] + numbers[i] + numbers[i + 1]);
        };

        return new RegExp("(" + sequentialNumbersArray.join('|') + ")", "i");
    };
};

export default PinValidator;