import Validator from './validator';
import topLevelDomains from '../lib/top-level-domains'

class EmailValidator extends Validator {
    tldExactMatchRegex;
    wellFormedRegex;

    constructor() {
        super();
        this.tldExactMatchRegex = this.setTldExactMatchRegex();
        this.wellFormedRegex = new RegExp(/\w+\@\w+\.\w+/, 'i');
    }

    toolTip() {
        return "TODO: Email Tooltip";
    };

    validate(element: string): Promise<boolean> {
        let errors: any[] = []

        if (!this.tldExactMatchRegex.test(element)) {
            errors.push("Emails require a valid top level domain");
        };
        if (!this.wellFormedRegex.test(element)) {
            errors.push("Email format not valid. Should be {something}@{something}.{top level domain}");
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

    /**
     * Generates the huge regex for top level domains
     */
    setTldExactMatchRegex() {
        return new RegExp("\\b((\\" + topLevelDomains.join(")$|(\\") + ")$)\\b", "i");
    };
};

export default EmailValidator;