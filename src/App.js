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

const App = () => (
  <Router>
    <Switch>
      <Route
        path="/login"
        render={(props) => (
          <AuthLayout {...props}>
            <LoginFormPage isLogin {...props} />
          </AuthLayout>
        )}
      />
      <Route
        path="/sign-up"
        render={(props) => (
          <AuthLayout {...props}>
            <LoginFormPage isLogin={false} {...props} />
          </AuthLayout>
        )}
      />
      <Route path="/feed" render={(props) => <MainLayout {...props}><FeedPage {...props} /></MainLayout>} />
      <Route path="/profile" exact render={(props) => <MainLayout {...props}><UserProfilePage {...props} /></MainLayout>} />
      <Route path="/forgot-password" exact render={(props) => <MainLayout {...props}><ForgotPasswordPage {...props} /></MainLayout>} />
      <Route path="/profile/:id" exact render={(props) => <MainLayout {...props}><UserProfilePage {...props} /></MainLayout>} />
      <Redirect from="/" to="/feed" exact />
      <Route render={(props) => (
        <NotFoundPage {...props} />
      )}
      />
    </Switch>
  </Router>
);

export default App;
