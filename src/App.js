import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserProfilePage from './pages/UserProfilePage';
import UserPage from './pages/UserPage';
import LoginFormPage from './pages/LoginFormPage';
import FeedPage from './pages/FeedPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Promises from './pages/Promises';
import routes from './routes';
import './modules/uploader';

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
        path="/promises"
        component={Promises}
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
        path={routes.forgotPassword}
        exact
        render={(props) => <AuthLayout {...props}><ForgotPasswordPage {...props} /></AuthLayout>}
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
        path={routes.profileId}
        exact
        render={(props) => <MainLayout {...props}><UserPage {...props} /></MainLayout>}
      />
      <Redirect from={routes.home} to={routes.feed} exact />
      <Route render={(props) => (
        <NotFoundPage {...props} />
      )}
      />
    </Switch>
    <ToastContainer />
  </Router>
);

export default App;
