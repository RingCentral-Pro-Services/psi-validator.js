import Validator from './validator';

/**
 * RingCentral requires valid email addresses for nearly all extension types. Here, we enforce good email form and top level domains.
 */
class IpValidator extends Validator {
    wellFormedRegex;

    constructor() {
        super();
        this.wellFormedRegex = new RegExp(/^(http|https)?(:\/\/)?([0-9]{1,3}\.){3}[0-9]{1,3}|(:[0-9]{1,5})$/, 'i');
    };

    validate(element: string): Promise<boolean> {
        let errors: any[] = [];

        if (!this.wellFormedRegex.test(element)) {
            errors.push("Web address format not valid. Should be http(s)://{something}.{top level domain}");
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

export default IpValidator;