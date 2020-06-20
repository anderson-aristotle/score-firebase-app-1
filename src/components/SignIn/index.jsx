import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
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
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = event => {
    const { email, password } = this.state;
    const { firebase, history } = this.props;

    console.log('attempting login')

    firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login successful')
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
        
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Container className="form">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control name="email" type="email" placeholder="Enter email" 
            value={email} onChange={this.handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Password</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control name="password" type="password" value={password} onChange={this.handleChange} />
        </InputGroup>

        <div className="controls">
          <Button variant="light" disabled={isInvalid} onClick={this.handleSubmit} >
            Log In
          </Button>
          <span style={{paddingLeft: '2em'}}>
            <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
          </span>
          
        </div>
        
        {error && <Alert variant="danger">{error.message}</Alert>}
      </Container>
    );

  }
}

const SignInLink = () => (
  <Container className="subform-link">
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </Container>
)

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

const SignInPage = () => (
  <Container className="page-content">
    <div className="login-form dialog-page">
      <h2 className="form-title">Log In</h2>
      <SignInForm />
    </div>
    <SignUpLink />
  </Container>
);

export { SignInForm, SignInLink };
export default SignInPage;


