import React from "react";

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { PasswordChangeForm } from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';

import '../Common/page.scss';
import '../Common/form.scss';

const accStyle = {
  width: '50%',
  float: 'right'
}

const AccountPage = () => (
  <div className="auth-page">
    <h1 className="page-title">Account Page</h1>
    <Container fluid="sm" className="page-content justify-content-center">
      <Accordion defaultActiveKey="0" className="account-options" style={accStyle}>
        <Card bg="dark" className="mb-2" text="white">
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Account Info
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <span className="todo">account info</span>
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
  </div>
);



export default AccountPage;
