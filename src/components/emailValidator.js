import {Container, Input} from 'semantic-ui-react';
import {EmailValidator} from 'psi-validator';
import React, { useState } from 'react';

function EmailValidatorComponent() {
  const [validatorResponse, setValidatorResponse] = useState(true);

  const validator = new EmailValidator();

  return (
    <Container>
      <Input
        label={"Email Address"}
        placeHolder={"Email Address"}
        onChange={(e, d) => {
          validator
            .validate(d.value)
            .then(res =>{
              setValidatorResponse(res)
            })
            .catch(err =>{
              setValidatorResponse(err.errors)
            })
        }}
      />

      <p>{validatorResponse === true ? 'true' : validatorResponse.join("; ")}</p>

    </Container>
  );
}

export default EmailValidatorComponent;