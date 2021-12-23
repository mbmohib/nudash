import { renderHook } from '@testing-library/react-hooks';

import { useSectionMeta } from '../hooks';
import { SectionProvider } from '../hooks/use-section-meta';

const fakeInitialState = {
  sectionId: '001',
  rowId: 0,
  columnId: 1,
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <SectionProvider initialState={fakeInitialState}>{children}</SectionProvider>
);

test('test section info passing correctly', () => {
  const { result } = renderHook(() => useSectionMeta(), { wrapper: Wrapper });

  expect(result.current.sectionId).toEqual(fakeInitialState.sectionId);
  expect(result.current.rowId).toEqual(fakeInitialState.rowId);
  expect(result.current.columnId).toEqual(fakeInitialState.columnId);
});
