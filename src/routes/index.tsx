import { Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from '../components';
import {
  Dashboard,
  GalleryIcons,
  GalleryImages,
  Menus,
  MetaData,
  NotFoundPage,
  Page,
} from '../screens';

const Routes = () => (
  <Layout>
    <Switch>
      <Redirect exact from="/" to="/dashboard/analytics" />
      <Route exact path="/dashboard/analytics" component={Dashboard} />
      <Redirect exact from="/site" to="/site/meta-data" />
      <Route exact path="/site/meta-data" component={MetaData} />
      <Route exact path="/site/menus" component={Menus} />
      <Redirect exact from="/gallery" to="/gallery/images" />
      <Route exact path="/gallery/images" component={GalleryImages} />
      <Route exact path="/gallery/icons" component={GalleryIcons} />
      <Redirect exact from="/pages" to="/pages/home" />
      <Route exact path="/pages/:page" component={Page} />
      <Route exact path="/404" component={NotFoundPage} />
      <Redirect to="/404" />
    </Switch>
  </Layout>
);

export default Routes;
