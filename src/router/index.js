import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Spinner } from 'reactstrap';
import useMe from '../hooks/useMe';
import AuthRouter from './AuthRouter';
import AppRouter from './AppRouter';

const RootRouter = () => {
  const [isLoggedIn, loading] = useMe();

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <Router>
      {!isLoggedIn ? (
        <AuthRouter />
      ) : (
        <AppRouter />
      )}
    </Router>
  );
};

export default RootRouter;
