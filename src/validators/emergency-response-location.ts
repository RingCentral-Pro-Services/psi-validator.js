import Validator from './validator';

/**
 * Validator for Emergency Response Location Addresses.
 */
class EmergencyResponseLocationValidator extends Validator{

    constructor() {
        super();
    };

    /**
     * Validate an individual item. Return true, or information about a failed validation
     *
     * @param element Element that we are validating
     * @param method Optional, in case there are differences in required fields based on request method
     * @returns true, or rejection that includes the original element, and an array of errors for it
     */
    async validate(element: any, method?: 'post' | 'put' ): Promise<boolean> {
        let errors: any[] = [];

        if (typeof (element) !== 'object') {
            errors.push(`Request is not an object, you sent ${typeof (element)}`);
        }
        if(!element.name) {
            errors.push('Name is required');
        }
        // ***** //
        if(!element.site){
            errors.push(`Missing site information`);
        }
        if(element.site && !element.site.id){
            errors.push(`Missing site ID`);
        }
        // ***** //
        if (!element.address) {
            errors.push(`Missing address`);
        }
        if(element.address && !element.address.street) {
            errors.push(`Missing street`);
        }
        if(element.address && !element.address.city) {
            errors.push(`Missing city`);
        }
        if(element.address && !element.address.state) {
            errors.push(`Missing state`);
        }
        if(element.address && !element.address.zip) {
            errors.push(`Missing zip code`);
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

    /**
     * Validate an array of items. Returns validation information on each item in the array
     *
     * @param array Array of elements to validate
     * @returns Array of validated elements, each is true, or a rejection that includes the original element, and an array of errors for it
     */
    async validateMany(array: any[]): Promise<any[]> {
        let returnArray: any[] = [];

        for (let element of array) {
            await this.validate(element)
                .then(res => {
                    returnArray.push(res);
                })
                .catch(e => {
                    returnArray.push(e);
                });
        }
        ;

        return new Promise((resolve) => {
            resolve(returnArray);
        });
    };
};

export default EmergencyResponseLocationValidator;