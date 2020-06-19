import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from '../Firebase/firebase';
import * as ROUTES from "../../constants/routes";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';


const INITAL_STATE = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
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
      passwordOne !== passwordTwo || passwordOne === "" || email === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="emailAddress">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
            value={email} onChange={this.onChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="passwordOne">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={passwordOne} onChange={this.onChange} />
        </Form.Group>
        <Form.Group controlId="passwordTwo">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" value={passwordTwo} onChange={this.onChange} />
        </Form.Group>
        
        <Button variant="light" disable={isInvalid} type="submit">
          Sign Up
        </Button>
        {error && <Alert variant="danger">{error.message}</Alert>}
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

const SignUpPage = () => (
  <Container className="login-form">
    <h1>Sign Up</h1>
    <SignUpForm />
  </Container>
);

export default SignUpPage;
export { SignUpForm, SignUpLink };
