import { ChakraProvider } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

import { ErrorFallback } from './components';
import { useToggle } from './hooks';
import Routes from './routes';
import { store } from './store/store';
import theme from './styles/theme';
import { errorHandler } from './utils';

export default function App() {
  const [error, setError] = useToggle();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={errorHandler}
          onReset={setError}
          resetKeys={[error]}
        >
          {error ? null : <Routes />}
        </ErrorBoundary>
      </ChakraProvider>
    </Provider>
  );
}
