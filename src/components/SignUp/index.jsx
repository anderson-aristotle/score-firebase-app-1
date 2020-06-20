import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from '../Firebase';
import * as ROUTES from "../../constants/routes";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { SignInLink } from '../SignIn';

import '../Common/form.scss';

const INITAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITAL_STATE };
  }

  onSubmit = (event) => {
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        this.setState({ ...INITAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  render() {
    const { email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type="email" placeholder="Enter email" 
            value={email} onChange={this.onChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Password</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type="password" value={passwordOne} onChange={this.onChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Confirm</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type="password" value={passwordTwo} onChange={this.onChange} />
        </InputGroup>

        <div className="controls">
          <Button variant="light" disabled={isInvalid} type="submit">
            Sign Up
          </Button>
        </div>
        
        {error && <Alert variant="danger">{error.message}</Alert>}
      </Form>
    );

  }
}

const SignUpLink = () => (
  <Container className="subform-link">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </Container>
);



const SignUpForm = withFirebase(SignUpFormBase);

const SignUpPage = () => (
  <Container className="page-content">
    <div className="login-form dialog-page">
      <h2 className="form-title">Sign Up</h2>
      <SignUpForm />
    </div>
    <SignInLink />
  </Container>
);

export default withRouter(SignUpPage);
export { SignUpForm, SignUpLink };
