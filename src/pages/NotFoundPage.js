import React from 'react';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Alert>
    You have just hit the route that is not found. Try returning back <Link to="/">Home</Link>
  </Alert>
);

export default NotFoundPage;
