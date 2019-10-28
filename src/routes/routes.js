import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import CreateDataPage from 'views/pages/CreateDataPage';
import UsersPage from 'views/pages/UsersPage';
import LoginPage from 'views/pages/LoginPage';
import UserDetailsPage from 'views/pages/UserDetailsPage';
import Layout from 'views/layouts/Layout';

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Redirect from="/" to="/users" exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/users" component={UsersPage} />
        <Route path="/user" component={UserDetailsPage} />
        <Route path="/create-data" component={CreateDataPage} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
