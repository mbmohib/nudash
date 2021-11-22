import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from '../components';
import { NotFoundPage, Page } from '../screens';

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Redirect exact from="/" to="/pages/home" />
        <Route exact path="/pages/:page" component={Page} />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
