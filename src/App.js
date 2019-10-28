import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import UserProfilePage from './pages/UserProfilePage';
import LoginFormPage from './pages/LoginFormPage';
import FeedPage from './pages/FeedPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';

const App = () => (
  <Router>
    <Switch>
      <Route
        path="/login"
        render={(props) => (
          <Container>
            <LoginFormPage isLogin {...props} />
          </Container>
        )}
      />
      <Route
        path="/sign-up"
        render={(props) => (
          <Container>
            <LoginFormPage isLogin={false} {...props} />
          </Container>
        )}
      />
      <Route path="/feed" render={(props) => <MainLayout {...props}><FeedPage {...props} /></MainLayout>} />
      <Route path="/profile" exact render={(props) => <MainLayout {...props}><UserProfilePage {...props} /></MainLayout>} />
      <Route path="/profile/:id" exact render={(props) => <MainLayout {...props}><UserProfilePage {...props} /></MainLayout>} />
      <Redirect from="/" to="/feed" exact />
      <Route render={(props) => (
        <MainLayout {...props}>
          <NotFoundPage />
        </MainLayout>
      )}
      />
    </Switch>
  </Router>
);

export default App;
