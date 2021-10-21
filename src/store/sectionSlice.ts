import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FieldType } from '../types/FieldType';
import { ActionType } from '../types/ActionType';
import { nanoid } from 'nanoid';

const initialDropZoneId = nanoid();

interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: any;
}

interface SectionState {
  sections: {
    id: number;
    rows: {
      id: number;
      columns: DraggableItem[][];
    }[];
  }[];
  dropZones: DraggableItem[];
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
          columnCount -
          state.sections[sectionIndex].rows[rowIndex].columns.length;

        for (let i = 0; i < totalColumn; i++) {
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
  },
});

export const { handleSection, handleRow, handleColumn, handleFieldDrop } =
  sectionSlice.actions;
export default sectionSlice.reducer;
