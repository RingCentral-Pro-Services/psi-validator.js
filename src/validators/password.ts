import Validator from './validator';
import numbers from '../lib/numbers';
import alphabet from '../lib/alphabet';

class PasswordValidator extends Validator {
    atLeastOneLetterRegex;
    atLeastOneNumberRegex;
    atLeastOneUpperOrSpecialRegex;
    sequentialNumbersRegex;
    repeatingNumbersRegex;
    sequentialLettersRegex;
    repeatingLettersRegex;

    constructor() {
        super();
        this.atLeastOneLetterRegex = new RegExp(/[a-zA-Z]{1,}/);
        this.atLeastOneNumberRegex = new RegExp(/\d{1,}/);
        this.atLeastOneUpperOrSpecialRegex = new RegExp(/[A-Z]{1,}|[!@#$%^&*]{1,}/);
        this.sequentialNumbersRegex = this.createSequentialNumbersRegex();
        this.repeatingNumbersRegex = this.createRepeatedNumbersRegex();
        this.sequentialLettersRegex = this.createSequentialLettersRegex();
        this.repeatingLettersRegex = this.createRepeatedLettersRegex();
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
        if (this.sequentialNumbersRegex.test(element)) {
            errors.push('Passwords cannot contain 3 sequential numbers, like 123');
        };
        if (this.repeatingNumbersRegex.test(element)) {
            errors.push('Passwords cannot contain 3 repeating numbers, like 111');
        };
        if (this.sequentialLettersRegex.test(element)) {
            errors.push('Passwords cannot contain 3 sequential letters, like abc');
        };
        if (this.repeatingLettersRegex.test(element)) {
            errors.push('Passwords cannot contain 3 repeating letters, like aaa');
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

    createRepeatedNumbersRegex() {
        let repeatedNumArr = [];

        for (let i = 0; i < numbers.length; i++) {
            repeatedNumArr.push(numbers[i] + numbers[i] + numbers[i]);
        };

        return new RegExp("(" + repeatedNumArr.join('|') + ")", "i");
    };

    createSequentialNumbersRegex() {
        let sequentialNumbers = [];

        for (let i = 0; i < numbers.length; i++) {
            if (i == 0 || i == numbers.length - 1) { continue };
            sequentialNumbers.push(numbers[i - 1] + numbers[i] + numbers[i + 1]);
        };

        numbers.reverse()

        for (let i = 0; i < numbers.length; i++) {
            if (i == 0 || i == numbers.length - 1) { continue };
            sequentialNumbers.push(numbers[i - 1] + numbers[i] + numbers[i + 1]);
        };

        return new RegExp("(" + sequentialNumbers.join('|') + ")", "i");
    };

    createRepeatedLettersRegex() {
        let repeatedLettersArr = [];

        for (let i = 0; i < alphabet.length; i++) {
            repeatedLettersArr.push(alphabet[i] + alphabet[i] + alphabet[i]);
        };

        return new RegExp("(" + repeatedLettersArr.join('|') + ")", "i");
    };

    createSequentialLettersRegex() {
        let sequentialLettersArray = [];

        for (let i = 0; i < alphabet.length; i++) {
            if (i == 0 || i == alphabet.length - 1) { continue };
            sequentialLettersArray.push(alphabet[i - 1] + alphabet[i] + alphabet[i + 1]);
        };

        numbers.reverse()

        for (let i = 0; i < alphabet.length; i++) {
            if (i == 0 || i == alphabet.length - 1) { continue };
            sequentialLettersArray.push(alphabet[i - 1] + alphabet[i] + alphabet[i + 1]);
        };

        return new RegExp("(" + sequentialLettersArray.join('|') + ")", "i");
    };
};

export default PasswordValidator;