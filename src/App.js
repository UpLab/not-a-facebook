import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import UserProfilePage from './pages/UserProfilePage';
import LoginFormPage from './pages/LoginFormPage';
import FeedPage from './pages/FeedPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import routes from './routes';

const App = () => (
  <Router>
    <Switch>
      <Route
        path={routes.login}
        render={(props) => (
          <AuthLayout {...props}>
            <LoginFormPage isLogin {...props} />
          </AuthLayout>
        )}
      />
      <Route
        path={routes.signUp}
        render={(props) => (
          <AuthLayout {...props}>
            <LoginFormPage isLogin={false} {...props} />
          </AuthLayout>
        )}
      />
      <Route
        path={routes.feed}
        render={(props) => <MainLayout {...props}><FeedPage {...props} /></MainLayout>}
      />
      <Route
        path={routes.profile}
        exact
        render={(props) => <MainLayout {...props}><UserProfilePage {...props} /></MainLayout>}
      />
      <Route
        path={routes.forgotPassword}
        exact
        render={(props) => <AuthLayout {...props}><ForgotPasswordPage {...props} /></AuthLayout>}
      />
      <Route
        path={routes.profileId}
        exact
        render={(props) => <MainLayout {...props}><UserProfilePage {...props} /></MainLayout>}
      />
      <Redirect from={routes.home} to={routes.feed} exact />
      <Route render={(props) => (
        <NotFoundPage {...props} />
      )}
      />
    </Switch>
  </Router>
);

export default App;
