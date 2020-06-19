import React from "react";
import { Link } from "react-router-dom";

import Container from '@material-ui/core/Container';

import * as ROUTES from "./constants/Routes";

const Navigation = () => (
  <Container>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    </ul>
  </Container>
);
export default Navigation;
