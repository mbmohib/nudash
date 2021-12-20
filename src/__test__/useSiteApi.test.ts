import { act, renderHook } from '@testing-library/react-hooks';

import { useGetSite, useUpdateSite } from '../hooks/useSiteApi';
import { siteData } from '../mocks/db';
import { server } from '../mocks/server';
import { createClientWrapper } from '../utils/test';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
});
afterEach(() => server.resetHandlers());

test('Get Site data', async () => {
  const { result, waitFor } = renderHook(() => useGetSite(), {
    wrapper: createClientWrapper(),
  });

  await waitFor(() => result.current.isSuccess);
  expect(result.current.data?.id).toBe(siteData.id);
});

test('update Site data', async () => {
  const { result, waitFor } = renderHook(() => useUpdateSite(), {
    wrapper: createClientWrapper(),
  });

  act(() => {
    result.current.mutate({ data: { ...siteData, name: 'My Rocking Site!' } });
  });

  await waitFor(() => result.current.isSuccess);
  expect(result.current.data?.data.name).toBe('My Rocking Site!');
});
