import React from "react";

import Container from 'react-bootstrap/Container';

import { PasswordChangeForm } from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';

const AccountPage = () => (
  <div className="auth-page">
    <h1>Account Page</h1>
    <Container fluid="sm">
      <PasswordChangeForm />
      <PasswordForgetForm />
    </Container>
  </div>
);



export default AccountPage;
