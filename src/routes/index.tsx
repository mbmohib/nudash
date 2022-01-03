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
          path="/dashboard"
          element={<Navigate to="/dashboard/analytics" />}
        />
        <Route path="/">
          <Route
            path="/dashboard/analytics"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/site" element={<Navigate to="/site/meta-data" />} />
        <Route path="/site">
          <Route
            path="meta-data"
            element={
              <RequireAuth>
                <MetaData />
              </RequireAuth>
            }
          />
          <Route
            path="menus"
            element={
              <RequireAuth>
                <Menus />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/gallery" element={<Navigate to="/gallery/images" />} />
        <Route path="/gallery">
          <Route
            path="images"
            element={
              <RequireAuth>
                <GalleryImages />
              </RequireAuth>
            }
          />
          <Route
            path="icons"
            element={
              <RequireAuth>
                <GalleryIcons />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/pages" element={<Navigate to="/pages/home" />} />
        <Route path="/pages">
          <Route
            path=":page"
            element={
              <RequireAuth>
                <Page />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
