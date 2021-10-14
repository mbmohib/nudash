import { RowActionType } from './RowActionType';

export interface HandleDropZoneType {
  (
    type: RowActionType,
    dropZoneId: string,
    sectionId: number,
    columnId: number,
  ): void;
}
