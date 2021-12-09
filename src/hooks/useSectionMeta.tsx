import { createContext, useContext, useMemo } from 'react';

interface ContextState {
  sectionId: string;
  rowId: number;
  columnId: number;
}

export const SectionContext = createContext({} as ContextState);

export function SectionProvider({
  initialState,
}: {
  initialState: ContextState;
}) {
  const contextValue = useMemo(
    () => ({
      sectionId: initialState?.sectionId,
      rowId: initialState?.rowId,
      columnId: initialState?.columnId,
    }),

    // eslint-disable-next-line
    [initialState?.sectionId, initialState?.rowId, initialState?.columnId],
  );

  return <SectionContext.Provider value={contextValue} />;
}

export default function useSectionMeta() {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
