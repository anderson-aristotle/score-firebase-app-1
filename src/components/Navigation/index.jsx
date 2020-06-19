import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

import SignOutButton from '../SignOut';
import { AUTH_ROUTES, OPEN_ROUTES } from '../../constants/routes';


const Navigation = ({ authUser }) => {
  const links = authUser ? AUTH_ROUTES : OPEN_ROUTES;
  return (
    <Nav className="nav-menu">
      {links.map((link, index) => (
        <Nav.Item key={index}>
          <Link to={link.route}>{link.text}</Link>
        </Nav.Item>
      ))}
      {authUser && (
        <Nav.Item>
          <SignOutButton />
        </Nav.Item>
      )}
    </Nav>
  )
};


export default Navigation;
