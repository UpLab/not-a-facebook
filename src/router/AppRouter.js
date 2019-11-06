import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import UserProfilePage from '../pages/UserProfilePage';
import UserPage from '../pages/UserPage';
import FeedPage from '../pages/FeedPage';
import NotFoundPage from '../pages/NotFoundPage';
import MainLayout from '../layouts/MainLayout';
import routes from './routes';

const AppRouter = () => (
  <MainLayout>
    <Switch>
      <Route path={routes.feed} render={(props) => <FeedPage {...props} />} />
      <Route
        path={routes.profile}
        exact
        render={(props) => <UserProfilePage {...props} />}
      />
      <Route
        path={routes.profileId}
        exact
        render={(props) => <UserPage {...props} />}
      />
      <Redirect from={routes.home} to={routes.feed} exact />
      <Redirect from={routes.login} to={routes.feed} exact />
      <Redirect from={routes.signUp} to={routes.feed} exact />
      <Route render={(props) => <NotFoundPage {...props} />} />
    </Switch>
  </MainLayout>
);

export default AppRouter;
