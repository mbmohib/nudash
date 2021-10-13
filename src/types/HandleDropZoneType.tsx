import { RowActionType } from './RowActionType';

export interface HandleDropZoneType {
  (
    type: RowActionType,
    rowId: string,
    sectionId: number,
    columnId: number,
  ): void;
}
