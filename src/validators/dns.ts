import Validator from './validator';
import topLevelDomains from '../lib/top-level-domains';

/**
 * RingCentral requires valid email addresses for nearly all extension types. Here, we enforce good email form and top level domains.
 */
class DnsValidator extends Validator {
    tldExactMatchRegex;
    wellFormedRegex;
    ipAddressRegex;

    constructor() {
        super();
        this.tldExactMatchRegex = this.setTldExactMatchRegex();
        this.wellFormedRegex = new RegExp(/^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, 'i');
        this.ipAddressRegex = new RegExp(/^http(s)?:\/\/((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/, 'i');
    };

    validate(element: string): Promise<boolean> {
        let errors: any[] = [];

        if (!this.tldExactMatchRegex.test(element)) {
            errors.push("Web addresses require a valid top level domain");
        };
        if (!this.wellFormedRegex.test(element)) {
            errors.push("Web address format not valid. Should be http(s)://{something}.{top level domain}");
        };
        if (this.ipAddressRegex.test(element)) {
            errors.push("IP addresses are prohibited. Should be http(s)://{something}.{top level domain}");
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

export default DnsValidator;