import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from '../Firebase';
import * as ROUTES from "../../constants/routes";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';


const INITAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class PasswordChangeFormBase extends Component {
  constructor (props) {
    super(props);
    this.state = {...INITAL_STATE};
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({...INITAL_STATE});
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="passwordOne">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={passwordOne} onChange={this.onChange} />
        </Form.Group>
        <Form.Group controlId="passwordTwo">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" value={passwordTwo} onChange={this.onChange} />
        </Form.Group>
        <Button variant="light" disabled={isInvalid} type="submit">
          Update Password
        </Button>
        {error && <Alert variant="danger">{error.message}</Alert>}
      </Form>
    )
  }
}

const PasswordChangeForm = compose(withRouter, withFirebase)(PasswordChangeFormBase);

const PasswordChangePage = () => (
  <Container className="login-form">
    <h1>Change Password</h1>
    <PasswordChangeForm />
  </Container>
);

export { PasswordChangeForm };
export default PasswordChangePage;