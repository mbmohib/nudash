import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/lexend';
import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { ErrorFallback } from './components';
import { useToggle } from './hooks';
import { worker } from './mocks/browser';
import reportWebVitals from './report-web-vitals';
import { store } from './store/store';
import theme from './styles/theme';
import { errorHandler } from './utils';

worker.start();

const queryClient = new QueryClient();

function AppRoot() {
  const [error, setError] = useToggle();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={errorHandler}
            onReset={setError}
            resetKeys={[error]}
          >
            <BrowserRouter>{error ? null : <App />}</BrowserRouter>
          </ErrorBoundary>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
