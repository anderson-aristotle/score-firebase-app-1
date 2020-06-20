import React from "react";
import { withFirebase } from '../Firebase';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { LANDING } from '../../constants/routes';


export const SignOutLink = withFirebase(({ firebase }) => (
  <Nav.Link href={LANDING} onClick={firebase.doSignOut}>Sign Out</Nav.Link>
));

const SignOutButton = ({ firebase, history, variant = 'light'}) => (
  <Button variant={variant} onClick={() => {
    firebase.doSignOut();
    history.push(LANDING);
  }}>Sign Out</Button>
);

export default withFirebase(SignOutButton);

