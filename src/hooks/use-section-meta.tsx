import { createContext, useContext, useMemo } from 'react';

interface ContextState {
  sectionId: string;
  rowId: number;
  columnId: number;
}

interface SectionProviderProps {
  initialState: ContextState;
  children: React.ReactNode;
}

export const SectionContext = createContext({} as ContextState);

export function SectionProvider({
  initialState,
  children,
}: SectionProviderProps) {
  const contextValue = useMemo(
    () => ({
      sectionId: initialState?.sectionId,
      rowId: initialState?.rowId,
      columnId: initialState?.columnId,
    }),

    // eslint-disable-next-line
    [initialState?.sectionId, initialState?.rowId, initialState?.columnId],
  );

  return (
    <SectionContext.Provider value={contextValue}>
      {children}
    </SectionContext.Provider>
  );
}

export default function useSectionMeta() {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
