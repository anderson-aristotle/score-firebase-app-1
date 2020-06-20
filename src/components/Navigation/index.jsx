import React from "react";
import { Link } from "react-router-dom";

// import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { SignOutLink } from '../SignOut';
import { AUTH_ROUTES, OPEN_ROUTES } from '../../constants/routes';

import './nav.scss';

const Navigation = ({ authUser }) => {
  const links = authUser ? AUTH_ROUTES : OPEN_ROUTES;
  return (
    <Container fluid className="menu-wrapper">
     <Nav className="menu justify-content-around">
        {links.map((link, index) => (
          <Nav.Item key={index}>
            <Link className="nav-link" to={link.route}>{link.text}</Link>
          </Nav.Item>
        ))}
        {authUser && (
          <Nav.Item>
            <SignOutLink />
          </Nav.Item>
        )}
      </Nav>
    </Container>
    
  )
};


export default Navigation;
