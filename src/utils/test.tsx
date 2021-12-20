import { ChakraProvider } from '@chakra-ui/react';
import { EnhancedStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { store as reduxStore } from '../store/store';
import theme from '../styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function render(
  ui: React.ReactElement,
  {
    client = queryClient,
    store = reduxStore,
    rtlOptions = {},
  }: { client?: QueryClient; store?: EnhancedStore; rtlOptions?: object } = {},
) {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </QueryClientProvider>
      </Provider>
    );
  };

  return { ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }) };
}

export function renderWithRouter(
  ui: React.ReactElement,
  {
    route = '/',
    client = queryClient,
    store = reduxStore,
    rtlOptions = {},
  }: {
    route?: string;
    client?: QueryClient;
    store?: EnhancedStore;
    rtlOptions?: object;
  } = {},
) {
  const history = createMemoryHistory({ initialEntries: [route] });

  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <ChakraProvider theme={theme}>
            <Router history={history}>{children}</Router>
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    );
  };

  return { ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }), history };
}

export const userEvent = fireEvent;
