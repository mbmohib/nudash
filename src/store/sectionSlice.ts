import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType, FieldType } from '../config';
import { nanoid } from 'nanoid';
import { DraggableItem } from '../types';

const initialDropZoneId = nanoid();

// TODO: remove dropzone from dropzones state

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
    dropZoneId: string;
    sectionId: number;
    columnId: number;
    rowId: number;
    hasField: boolean;
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
          columns: [[{ id: initialDropZoneId }]],
        },
      ],
    },
  ],
  dropZones: [initialDraggableState],
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
              columns: [[{ id: newDropZoneId }]],
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
      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );

      if (actionType === ActionType.Add) {
        const newDropZoneId = nanoid();
        const position = rowId + 1;

        state.sections[sectionIndex].rows.splice(position, 0, {
          id: state.sections[sectionIndex].rows.length,
          columns: [[{ id: newDropZoneId }]],
        });

        state.dropZones.push({
          ...initialDraggableState,
          id: newDropZoneId,
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
        const totalColumn =
          state.sections[sectionIndex].rows[rowIndex].columns.length;
        const columnsToAdd = columnCount - totalColumn;

        for (let i = 0; i < columnsToAdd; i++) {
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

        state.sections[sectionIndex].rows[rowIndex].columns.splice(
          1,
          0,
          ...newColumns,
        );
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

      if (state.lastDropItemInfo) {
        state.lastDropItemInfo.hasField = true;
      }

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
      }>,
    ) {
      const { actionType, dropZoneId, rowId, sectionId, columnId } =
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
      ].findIndex(dropZone => dropZone.id === dropZoneId);

      const currentColumn =
        state.sections[sectionIndex].rows[rowIndex].columns[columnIndex];

      const isAlreadyEmptyDropZoneExist = currentColumn.find(column => {
        return state.dropZones.find(
          dropZone => dropZone.id === column.id && !dropZone.fieldType,
        ) as DraggableItem;
      });

      if (actionType === ActionType.Add && !isAlreadyEmptyDropZoneExist) {
        currentColumn.splice(dropZoneIndex + 1, 0, {
          id: newDropZoneId,
        });

        state.lastDropItemInfo = {
          dropZoneId: newDropZoneId,
          columnId,
          sectionId,
          rowId,
          hasField: false,
        };

        state.dropZones.push({
          ...initialDraggableState,
          id: newDropZoneId,
        });
      }

      if (actionType === ActionType.Delete) {
        currentColumn.splice(dropZoneIndex, 1);
      }
    },
  },
});

export const {
  handleSection,
  handleRow,
  handleColumn,
  handleFieldDrop,
  handleDropZone,
} = sectionSlice.actions;
export default sectionSlice.reducer;
