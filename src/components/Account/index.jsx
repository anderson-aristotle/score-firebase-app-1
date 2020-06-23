import React from "react";

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { PasswordChangeForm } from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import { authPageText } from '../Common/text';
import { AuthUserContext, withAuthorization } from '../Session';

import '../Common/page.scss';
import '../Common/form.scss';

const accStyle = {
  width: '50%',
  float: 'right',
  marginTop: '1em'
}

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      
      <Container fluid="sm" className="page-content justify-content-center">
        <header>
          <h2 className="page-title">Account Page</h2>
          <p>{authPageText}</p>
        </header>
        
        <Accordion defaultActiveKey="0" className="account-options" style={accStyle}>
          <Card bg="dark" className="mb-2" text="white">
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Account Info
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {authUser && (
                <div className="info">
                  {/* <div className="field">
                    <span className="label">Name:</span>
                    <span className="info">
                      {authUser.user.username}
                    </span>
                  </div> */}
                  <span className="label">Email: </span>
                  <span className="info">
                    {authUser.email}
                  </span>
                </div>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card bg="primary" className="mb-2" text="white">
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Change Password
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="login-form">
                  <h3>Change Password</h3>
                  <PasswordChangeForm />
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card bg="secondary" className="mb-2" text="dark">
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Reset Password
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <div className="login-form">
                  <h3 className="form-title">Reset Password</h3>
                  <PasswordForgetForm />
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

      </Container>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
