import { Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from '../components';
import { Dashboard, Login, NotFoundPage, Page, Schema, Site } from '../screens';

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/site" component={Site} />
      <Route exact path="/schema" component={Schema} />
      <Redirect exact from="/pages" to="/pages/home" />
      <Route exact path="/pages/:page" component={Page} />
      <Route exact path="/404" component={NotFoundPage} />
      <Redirect to="/404" />
    </Switch>
  </Layout>
);

export default Routes;
