import { ChakraProvider } from '@chakra-ui/react';
import { render as rtlRender } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { store } from '../store/store';
import theme from '../styles/theme';

export function render(
  ui: React.ReactElement,
  { route = '/', options = {} }: { route?: string; options?: object } = {},
) {
  const queryClient = new QueryClient();
  const history = createMemoryHistory({ initialEntries: [route] });

  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Router history={history}>{children}</Router>
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    );
  };

  return { ...rtlRender(ui, { wrapper: Wrapper, ...options }), history };
}

export const userEvent = fireEvent;
