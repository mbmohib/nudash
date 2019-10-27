import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Dashboard from 'views/pages/Dashboard';
import UsersPage from 'views/pages/UsersPage';
import LoginPage from 'views/pages/LoginPage';
import UserDetailsPage from 'views/components/UserDetailsPage';
import Layout from 'views/layouts/Layout';

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Redirect from="/" to="/dashboard" exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={UsersPage} />
        <Route path="/user/:id" component={UserDetailsPage} />
        <Route component={Dashboard} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
