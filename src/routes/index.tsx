import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Layout } from '../components';
import { useSelector } from '../hooks';
import {
  Dashboard,
  GalleryIcons,
  GalleryImages,
  Login,
  Menus,
  MetaData,
  NotFoundPage,
  Page,
} from '../screens';

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useSelector(state => state.auth);
  const location = useLocation();

  if (!auth.isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function Router() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        {/* <Navigate from="/site" to="/site/meta-data" /> */}
        {/* <Route  path="/site/meta-data" component={MetaData} />
      <Route  path="/site/menus" component={Menus} />
      <Navigate  from="/gallery" to="/gallery/images" />
      <Route  path="/gallery/images" component={GalleryImages} />
      <Route  path="/gallery/icons" component={GalleryIcons} />
      <Navigate  from="/pages" to="/pages/home" />
      <Route  path="/pages/:page" component={Page} />
      <Route  path="/404" component={NotFoundPage} /> */}
        {/* <Navigate to="/404" /> */}
      </Routes>
    </Layout>
  );
}
