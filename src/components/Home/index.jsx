import React from "react";
import Container from "react-bootstrap/Container";
import { withAuthorization } from '../Session';
import { authPageText } from '../Common/text';

const HomePage = () => (
  <Container fluid className="page-content">
    <header>
      <h3 className="page-title">Home Page</h3>
      <p>{authPageText}</p>
    </header>
    
  </Container>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
