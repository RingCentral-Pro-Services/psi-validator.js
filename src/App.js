import { Container, Divider, Header } from 'semantic-ui-react';
import EmailValidatorComponent from './components/emailValidator'

function App() {
  return (
    <Container>
      <Header as={"h2"}>
        Input fields for checking out the responses from psi-validator
      </Header>
      <Divider/>
      <EmailValidatorComponent/>
    </Container>
  );
}

export default App;
