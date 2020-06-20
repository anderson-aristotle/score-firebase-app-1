import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from '../Firebase';
import * as ROUTES from "../../constants/routes";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';


import '../Common/form.scss';

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
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control name="email" type="email" placeholder="Enter email" 
            value={email} onChange={this.onChange} />
        </InputGroup>
        <div className="controls">
          <Button variant="light" disabled={isInvalid} type="submit">
            Reset My Password
          </Button>
        </div>
        
        {error && <Alert variant="danger">{error.message}</Alert>}
      </Form>
    )

  }

  
};

const PasswordForgetForm = compose(withRouter, withFirebase)(PasswordForgetFormBase);

const PasswordForgetPage = () => (
  <Container className="page-content">
    <div className="login-form dialog-page">
      <h3 className="form-title">Reset Password</h3>
      <PasswordForgetForm />
    </div>
  </Container>
);

export { PasswordForgetForm };

export default PasswordForgetPage;
