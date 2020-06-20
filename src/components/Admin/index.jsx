import React from "react";
import Container from "react-bootstrap/Container";
// import * as ROLES from '../../constants/roles';
import { restrictedPageText } from '../Common/text';
import { withAuthorization } from '../Session';

const AdminPage = () => (
  <Container fluid className="page-content">
    <header>
      <h3 className="page-title">Admin Page</h3>
      <p>{restrictedPageText}</p>
    </header>
    
  </Container>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
