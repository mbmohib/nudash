import { render as rtlRender } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export function render(
  ui: React.ReactElement,
  { route = '/', options = {} }: { route?: string; options?: object } = {},
) {
  const queryClient = new QueryClient();
  const history = createMemoryHistory({ initialEntries: [route] });

  const Wrapper: React.FC = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Router history={history}>{children}</Router>
      </QueryClientProvider>
    );
  };

  return { ...rtlRender(ui, { wrapper: Wrapper, ...options }), history };
}
