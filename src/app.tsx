import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PreLoader } from './components';
import { useDispatch, useToggle } from './hooks';
import Routes from './routes';
import { useRefreshToken } from './services/auth.api';
import { removeAuth } from './store/slices/auth.slice';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getRefreshToken = useRefreshToken();
  const [loading, setLoading] = useToggle(true);

  useEffect(() => {
    getRefreshToken.mutate(
      {
        data: '',
      },
      {
        onSettled: () => {
          setLoading(false);
        },
        onError: () => {
          navigate('/login');
        },
      },
    );
  }, []);

  const handleSyncLogout = (event: StorageEvent) => {
    if (event.key === 'logout') {
      dispatch(removeAuth());
      // navigate('/login');
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleSyncLogout);

    return () => {
      window.removeEventListener('storage', handleSyncLogout);
    };
  }, []);

  return (
    <PreLoader isLoading={loading}>
      <Routes />
    </PreLoader>
  );
}
