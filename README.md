[![Node.js CI](https://github.com/RingCentral-Pro-Services/psi-validator.js/actions/workflows/tests.js.yml/badge.svg)](https://github.com/RingCentral-Pro-Services/psi-validator.js/actions/workflows/tests.js.yml)

# About
RingCentral Professional Services Innovation team (PSi) needs to be able to verify information in browser. 
This information all needs to be validated exactly per RC requirements. These requirements easily vary by endpoint and 
HTTP method, and aren't discernible from the RC OpenAPI documentation.

### Demo
https://ringcentral-pro-services.github.io/psi-validator.js/

## Installation
To use this in your app, install with `npm` or `yarn`. 

```shell
$ npm i psi-validator
```
or
```shell
$ yarn add psi-validator
```

Then require or import a validator into your app for use

```javascript
const { EmailValidator } = require('psi-validator');
```
or
```javascript
import { EmailValidator } from 'psi-validator';
```

Finally, for each imported validator, create an instance of the class for use

```javascript
const validator = new EmailValidator();
```

## Example Usage
After importing the library, try out the following code

```js
async function main() {
  let goodEmail = 'john.celoria@ringcentral.com'
  let badEmail = 'john.celoria@ringcentral.someBadTld'
  let evenWorseEmail = 'john.celoria2ringcentral.someBadTld'

  await validator
    .validate(goodEmail)
    .then(res =>{
      console.log(res);
    })
    .catch(e =>{
      console.error(e);
    });

  await validator
    .validate(badEmail)
    .then(res =>{
      console.log(res);
    })
    .catch(e =>{
      console.error(e);
    });

  await validator
    .validate(evenWorseEmail)
    .then(res =>{
      console.log(res);
    })
    .catch(e =>{
      console.error(e);
    });
}

main();
```

Your response should be the following: 

```shell
john.celoria@LM1ARMD6R psi-validator.js % node sandbox.js
true
{
  originalElement: 'john.celoria@ringcentral.someBadTld',
  errors: [ 'Emails require a valid top level domain' ]
}
{
  originalElement: 'john.celoria2ringcentral.someBadTld',
  errors: [
    'Emails require a valid top level domain',
    'Email format not valid. Should be {something}@{something}.{top level domain}'
  ]
}
```
