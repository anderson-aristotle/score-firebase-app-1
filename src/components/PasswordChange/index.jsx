import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from '../Firebase';
import * as ROUTES from "../../constants/routes";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import '../Common/form.scss';

const INITAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeFormBase extends Component {
  constructor (props) {
    super(props);
    this.state = {...INITAL_STATE};
  }

  handleSubmit = event => {
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render () {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Password</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control name="passwordOne" type="password" value={passwordOne} onChange={this.handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Confirm</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control name="passwordTwo" type="password" value={passwordTwo} onChange={this.handleChange} />
        </InputGroup>
        <div className="controls">
          <Button variant="light" disabled={isInvalid} type="submit">
            Update Password
          </Button>
        </div>
        
        {error && <Alert variant="danger">{error.message}</Alert>}
      </Form>
    )
  }
}

const PasswordChangeForm = compose(withRouter, withFirebase)(PasswordChangeFormBase);

const PasswordChangePage = () => (
  <Container className="page-content">
    <div className="login-form dialog-page">
      <h2 className="form-title">Change Password</h2>
      <PasswordChangeForm />
    </div>
  </Container>
);

export { PasswordChangeForm };
export default PasswordChangePage;