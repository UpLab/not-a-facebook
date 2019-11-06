import React from 'react';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import routes from '../router/routes';


const NotFoundPage = () => (
  <Alert>
      You have just hit the route that is not found. Try returning back
    <Link to={routes.home}>Home</Link>
  </Alert>
);

export default NotFoundPage;
