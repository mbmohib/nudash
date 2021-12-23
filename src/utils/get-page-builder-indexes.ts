import { Page } from '../types';

interface GetPageBuilderIndexes extends Pick<Page, 'sections'> {
  sectionId: string;
  rowId?: number;
  columnId?: number;
}

export default function getPageBuilderIndexes({
  sections,
  sectionId,
  rowId,
  columnId,
}: GetPageBuilderIndexes) {
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
