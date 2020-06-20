import React from "react";
import { useLocation } from 'react-router-dom';
import Container from "react-bootstrap/Container";

export const DefaultPage = () => {
  let location = useLocation();

  return (
    <Container fluid className="page-content">
      <header>
        <h3 className="page-title">Page Not Found</h3>
        <p>
          The page are looking for, <span>{location.pathname}</span>,
          could not be found.
        </p>
      </header>
      
    </Container>
  )
}


const LandingPage = () => (
  <Container fluid className="page-content">
    <header>
      <h3 className="page-title">Landing Page</h3>
    </header>
  </Container>
);

export default LandingPage;
