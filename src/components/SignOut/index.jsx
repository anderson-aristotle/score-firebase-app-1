import React from "react";
import { withFirebase } from '../Firebase';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { LANDING } from '../../constants/routes';


export const SignOutLink = withFirebase(({ firebase }) => (
  <Nav.Link href={LANDING} onClick={firebase.doSignOut}>Sign Out</Nav.Link>
));

const SignOutButton = ({ firebase, variant = 'light'}) => (
  <Button variant={variant} onClick={() => {
    firebase.doSignOut();
  }}>Sign Out</Button>
);

export default withFirebase(SignOutButton);

