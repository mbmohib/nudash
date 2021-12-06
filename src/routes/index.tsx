import { Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from '../components';
import {
  Dashboard,
  Login,
  Menus,
  MetaData,
  NotFoundPage,
  Page,
  Schema,
} from '../screens';

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Redirect exact from="/site" to="/site/meta-data" />
      <Route exact path="/site/meta-data" component={MetaData} />
      <Route exact path="/site/menus" component={Menus} />
      <Route exact path="/schema" component={Schema} />
      <Redirect exact from="/pages" to="/pages/home" />
      <Route exact path="/pages/:page" component={Page} />
      <Route exact path="/404" component={NotFoundPage} />
      <Redirect to="/404" />
    </Switch>
  </Layout>
);

export default Routes;
