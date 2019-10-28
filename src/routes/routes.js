import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Dashboard from 'views/pages/Dashboard';
import UsersPage from 'views/pages/UsersPage';
import LoginPage from 'views/pages/LoginPage';
import UserDetailsPage from 'views/pages/UserDetailsPage';
import Layout from 'views/layouts/Layout';

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Redirect from="/" to="/login" exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/users" component={UsersPage} />
        <Route path="/user/" component={UserDetailsPage} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
