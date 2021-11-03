import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { ActionType, FieldType } from '../config';
import { nanoid } from 'nanoid';
import { DraggableItem } from '../types';

const initialDropZoneId = nanoid();

interface SectionState {
  sections: {
    id: number;
    rows: {
      id: number;
      columns: DraggableItem[][];
    }[];
  }[];
  dropZones: DraggableItem[];
  lastDropItemInfo?: {
    sectionId: number;
    columnId: number;
    rowId: number;
  };
}

const initialDraggableState: DraggableItem = {
  id: initialDropZoneId,
  fieldType: undefined,
  data: null,
};

const initialState: SectionState = {
  sections: [
    {
      id: 0,
      rows: [
        {
          id: 0,
          columns: [[]],
        },
      ],
    },
  ],
  dropZones: [],
};

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    handleSection(
      state,
      action: PayloadAction<{
        actionType: ActionType;
        id: number;
      }>,
    ) {
      const { id, actionType } = action.payload;

      if (actionType === ActionType.Add) {
        const newDropZoneId = nanoid();
        const position = id + 1;

        state.sections.splice(position, 0, {
          id: state.sections.length,
          rows: [
            {
              id: 0,
              columns: [[]],
            },
          ],
        });

        state.dropZones.push({
          ...initialDraggableState,
          id: newDropZoneId,
        });
      }

      if (actionType === ActionType.Delete) {
        state.sections = state.sections.filter(section => section.id !== id);
      }
    },
    handleRow(
      state,
      action: PayloadAction<{
        actionType: ActionType;
        sectionId: number;
        rowId: number;
      }>,
    ) {
      const { actionType, sectionId, rowId } = action.payload;
      const position = rowId + 1;
      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );
      const nextRow = state.sections[sectionIndex].rows[position];
      const isAddRow = !nextRow || nextRow.columns[0].length > 0;

      if (actionType === ActionType.Add && isAddRow) {
        state.sections[sectionIndex].rows.splice(position, 0, {
          id: state.sections[sectionIndex].rows.length,
          columns: [[]],
        });
      }

      if (actionType === ActionType.Delete) {
        const rows = state.sections[sectionIndex].rows.filter(
          row => row.id !== rowId,
        );
        state.sections[sectionIndex].rows = rows;
      }
    },
    handleColumn(
      state,
      action: PayloadAction<{
        actionType: ActionType;
        sectionId: number;
        rowId: number;
        columnCount: number;
      }>,
    ) {
      const { actionType, sectionId, rowId, columnCount } = action.payload;

      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );
      const rowIndex = state.sections[sectionIndex].rows.findIndex(
        row => row.id === rowId,
      );

      if (actionType === ActionType.Modify) {
        const newColumns: DraggableItem[][] = [];

        for (let i = 0; i < columnCount; i++) {
          const newDropZoneId = nanoid();

          newColumns.push([
            {
              id: newDropZoneId,
            },
          ]);

          state.dropZones.push({
            ...initialDraggableState,
            id: newDropZoneId,
          });
        }

        state.sections[sectionIndex].rows[rowIndex].columns = newColumns;
      }
    },
    handleFieldDrop(
      state,
      action: PayloadAction<{
        fieldType: FieldType;
        dropZoneId: string;
      }>,
    ) {
      const { fieldType, dropZoneId } = action.payload;

      state.dropZones = state.dropZones.map((dropZone: DraggableItem) => {
        if (dropZone.id === dropZoneId) {
          return {
            ...dropZone,
            fieldType,
          };
        }
        return dropZone;
      });
    },
    handleDropZone(
      state,
      action: PayloadAction<{
        actionType: ActionType;
        dropZoneId: string;
        sectionId: number;
        rowId: number;
        columnId: number;
        handlerId?: string;
      }>,
    ) {
      const { actionType, dropZoneId, rowId, sectionId, columnId, handlerId } =
        action.payload;
      const newDropZoneId = nanoid();

      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );

      const rowIndex = state.sections[sectionIndex].rows.findIndex(
        row => row.id === rowId,
      );

      const columnIndex = state.sections[sectionIndex].rows[
        rowIndex
      ].columns.findIndex((_, index) => index === columnId);

      const dropZoneIndex = state.sections[sectionIndex].rows[rowIndex].columns[
        columnIndex
      ].findIndex(
        dropZone =>
          dropZone.handlerId === handlerId || dropZone.id === dropZoneId,
      );

      const currentColumn =
        state.sections[sectionIndex].rows[rowIndex].columns[columnIndex];

      const nextDropZone = currentColumn[dropZoneIndex + 1];

      const isAlreadyEmptyDropZoneExist = state.dropZones.find(
        item => item.id === nextDropZone?.id && !item.fieldType,
      );

      if (actionType === ActionType.Add && !isAlreadyEmptyDropZoneExist) {
        currentColumn.splice(dropZoneIndex + 1, 0, {
          id: newDropZoneId,
        });

        state.lastDropItemInfo = {
          columnId,
          sectionId,
          rowId,
        };

        state.dropZones.push({
          ...initialDraggableState,
          id: newDropZoneId,
        });
      }

      // TODO: make it work
      if (actionType === ActionType.Delete) {
        currentColumn.splice(dropZoneIndex, 1);
      }
    },
    attachDropZoneId(
      state,
      action: PayloadAction<{
        dropZoneId: string;
        sectionId: number;
        rowId: number;
        columnId: number;
        handlerId: string;
      }>,
    ) {
      const { dropZoneId, rowId, sectionId, columnId, handlerId } =
        action.payload;

      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );

      const rowIndex = state.sections[sectionIndex].rows.findIndex(
        row => row.id === rowId,
      );

      const columnIndex = state.sections[sectionIndex].rows[
        rowIndex
      ].columns.findIndex((_, index) => index === columnId);

      const dropZoneIndex = state.sections[sectionIndex].rows[rowIndex].columns[
        columnIndex
      ].findIndex(dropZone => dropZone.id === dropZoneId);

      state.sections[sectionIndex].rows[rowIndex].columns[columnIndex][
        dropZoneIndex
      ].handlerId = handlerId;
    },
    removeUnUsedDropZones(
      state,
      action: PayloadAction<{
        sectionId: number;
        rowId: number;
        columnId: number;
      }>,
    ) {
      const { rowId, sectionId, columnId } = action.payload;

      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );

      const rowIndex = state.sections[sectionIndex].rows.findIndex(
        row => row.id === rowId,
      );

      const columnIndex = state.sections[sectionIndex].rows[
        rowIndex
      ].columns.findIndex((_, index) => index === columnId);

      state.sections[sectionIndex].rows[rowIndex].columns[columnIndex] =
        state.sections[sectionIndex].rows[rowIndex].columns[columnIndex].filter(
          dropZone => {
            return !state.dropZones.find(
              item => item.id === dropZone.id && !item.fieldType,
            );
          },
        );
    },
    removeUnUsedRows(state) {
      state.sections.map(section => {
        section.rows = section.rows.filter(row => row.columns[0].length);
        return section;
      });
    },
  },
});

export const {
  handleSection,
  handleRow,
  handleColumn,
  handleFieldDrop,
  handleDropZone,
  attachDropZoneId,
  removeUnUsedDropZones,
  removeUnUsedRows,
} = sectionSlice.actions;
export default sectionSlice.reducer;
