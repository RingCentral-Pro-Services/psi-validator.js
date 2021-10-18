/**
 * Base class for all Validators.
 */
class Validator {

    constructor() { };

    /**
     * Validate an individual item. Return true, or information about a failed validation
     * 
     * @param element Element that we are validating
     * @param method Optional, in case there are differences in required fields based on request method
     * @returns true, or rejection that includes the original element, and an array of errors for it
     */
    validate(element: any, method?: 'post' | 'put' | 'get' | 'delete'): Promise<boolean> {
        return new Promise((resolve) => {
            resolve(true);
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
        };

        return new Promise((resolve) => {
            resolve(returnArray);
        });
    };
};

export default Validator;