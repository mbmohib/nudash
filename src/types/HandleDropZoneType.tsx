import { ActionType } from './ActionType';

export interface HandleDropZoneType {
  (
    type: ActionType,
    dropZoneId: string,
    sectionId: number,
    columnId: number,
  ): void;
}
