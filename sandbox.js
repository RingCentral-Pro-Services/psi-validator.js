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