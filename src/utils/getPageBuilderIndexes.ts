import { Page } from '../types';

export default function getPageBuilderIndexes(
  sections: Page['sections'],
  sectionId: string,
  rowId?: number,
  columnId?: number,
) {
  let rowIndex = 0;
  let columnIndex = 0;

  const sectionIndex = sections.findIndex(section => section.id === sectionId);

  if (rowId || rowId === 0) {
    rowIndex = sections[sectionIndex].rows.findIndex(row => row.id === rowId);
  }

  if (columnId || columnId === 0) {
    columnIndex = sections[sectionIndex].rows[rowIndex].columns.findIndex(
      (_, index) => index === columnId,
    );
  }

  return {
    sectionIndex,
    rowIndex,
    columnIndex,
  };
}
