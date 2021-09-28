# About
RingCentral Professional Services Innovation team (PSi) needs to be able to verify information in browser. 
This information all needs to be validated exactly per RC requirements. These requirements easily vary by endpoint and 
HTTP method, and aren't discernible from the RC OpenAPI documentation.

### Demo
https://ringcentral-pro-services.github.io/psi-validator.js/

# Example Usage
After importing the library, try out the following code

```js
const { EmailValidator } = require('./dist/index');

const validator = new EmailValidator();

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