import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from '../components';
import { NotFoundPage, Page } from '../screens';

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Page} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
