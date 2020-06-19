import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';


const Navigation = ({ navLinks }) => (
  <Nav className="nav-menu">
  {navLinks.map((link, index) => (
    <Nav.Item key={index}>
      <Link to={link.route}>{link.text}</Link>
    </Nav.Item>
  ))}
  </Nav>
);
export default Navigation;
