import React from "react";
import { Link } from "react-router-dom";

// import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { SignOutLink } from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import './nav.scss';

const MenuAuth = () => (
  <Nav className="menu auth-menu justify-content-around">
    <Nav.Item>
      <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
    </Nav.Item>
    <Nav.Item>
      <Link className="nav-link" to={ROUTES.ACCOUNT}>Account</Link>
    </Nav.Item>
    <Nav.Item>
      <Link className="nav-link" to={ROUTES.ADMIN}>Admin</Link>
    </Nav.Item>
    <Nav.Item>
      <SignOutLink />
    </Nav.Item>
  </Nav>
);

const MenuNoAuth = () => (
  <Nav className="menu justify-content-around">
    <Nav.Item>
      <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
    </Nav.Item>
    <Nav.Item>
      <Link className="nav-link" to={ROUTES.SIGN_UP}>Sign Up</Link>
    </Nav.Item>
    <Nav.Item>
      <Link className="nav-link" to={ROUTES.LANDING}>Landing</Link>
    </Nav.Item>
  </Nav>
);

const Navigation = () => (
  <Container fluid="sm" className="menu-wrapper">
    <AuthUserContext.Consumer>
      {authUser => 
        authUser ? <MenuAuth /> : <MenuNoAuth />
      }
    </AuthUserContext.Consumer>
  </Container>
);

export default Navigation;
