import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PreLoader } from './components';
import { useToggle } from './hooks';
import Routes from './routes';
import { useRefreshToken } from './services/auth.api';

export default function App() {
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

  return (
    <PreLoader isLoading={loading}>
      <Routes />
    </PreLoader>
  );
}
