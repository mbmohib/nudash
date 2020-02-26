import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { Dashboard, UsersPage, LoginPage } from "views/pages";
import Layout from "views/layouts/Layout";

const PrivateRoute = ({ component: Component, ...props }) => {
  const auth = useSelector(({ auth }) => auth.jwt);

  return (
    <Route
      {...props}
      render={innerProps =>
        auth ? <Component {...innerProps} /> : <Redirect to="/" />
      }
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
        <PrivateRoute path="/users" component={UsersPage} exact />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
