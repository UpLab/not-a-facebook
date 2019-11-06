import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import LoginFormPage from '../pages/LoginFormPage';
import AuthLayout from '../layouts/AuthLayout';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import Promises from '../pages/Promises';
import routes from './routes';

const AuthRouter = (p) => (
  <AuthLayout {...p}>
    <Switch>
      <Route
        path={routes.login}
        render={(props) => <LoginFormPage isLogin {...props} />}
      />
      <Route path="/promises" component={Promises} />
      <Route
        path={routes.signUp}
        render={(props) => (
          <LoginFormPage isLogin={false} {...props} />
        )}
      />
      <Route
        path={routes.forgotPassword}
        exact
        component={ForgotPasswordPage}
      />
      <Route render={() => <Redirect to={routes.login} exact />} />
    </Switch>
  </AuthLayout>
);

export default AuthRouter;
