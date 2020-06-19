import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from '../Firebase';
import * as ROUTES from "../../constants/routes";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';


const INITIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor (props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render () {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="emailAddress">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
            value={email} onChange={this.onChange} />
        </Form.Group>
        <Button variant="light" disable={isInvalid} type="submit">
          Reset My Password
        </Button>
        {error && <Alert variant="danger">{error.message}</Alert>}
      </Form>
    )
  }

  
};

const PasswordForgetForm = compose(withRouter, withFirebase)(PasswordForgetFormBase);

const PasswordForgetPage = () => (
  <Container className="login-form">
    <h1>Reset Password</h1>
    <PasswordForgetForm />
  </Container>
);

export { PasswordForgetForm };

export default PasswordForgetPage;
