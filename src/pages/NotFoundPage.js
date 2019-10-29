import React from 'react';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import UsersModel from '../modules/users';


const NotFoundPage = (props) => {
  const isLogginIn = UsersModel.isLoggedIn();
  return (
    <>
      {isLogginIn} ?
      <MainLayout {...props}>
        <Alert>
          You have just hit the route that is not found. Try returning back <Link to="/">Home</Link>
        </Alert>
      </MainLayout>
      :
      <AuthLayout {...props}>
        <Alert>
          You have just hit the route that is not found. Try returning back <Link to="/">Home</Link>
        </Alert>
      </AuthLayout>
    </>
  );
};

export default NotFoundPage;
