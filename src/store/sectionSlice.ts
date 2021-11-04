import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FieldType } from '../config';
import { nanoid } from 'nanoid';
import { DraggableItem } from '../types';

const initialDropZoneId = nanoid();

interface LastDropItem {
  sectionId: number;
  columnId: number;
  rowId: number;
  hasField: boolean;
  dropZoneId: string;
}

interface LastRowItem {
  sectionId: number;
  rowId: number;
  hasColumn: boolean;
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
  lastDropItemInfo?: LastDropItem;
  lastRowItemInfo?: LastRowItem;
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
  lastRowItemInfo: {
    sectionId: 0,
    rowId: 0,
    hasColumn: false,
  },
};

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    handleAddSection(
      state,
      action: PayloadAction<{
        id: number;
      }>,
    ) {
      const { id } = action.payload;
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
    },
    handleRemoveSection(
      state,
      action: PayloadAction<{
        id: number;
      }>,
    ) {
      const { id } = action.payload;

      state.sections = state.sections.filter(section => section.id !== id);
    },
    handleAddRow(
      state,
      action: PayloadAction<{
        sectionId: number;
        rowId: number;
      }>,
    ) {
      const { sectionId, rowId } = action.payload;
      const position = rowId + 1;
      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );
      const nextRow = state.sections[sectionIndex].rows[position];
      const isAddRow = !nextRow || nextRow.columns[0].length > 0;

      if (isAddRow) {
        const rowId = state.sections[sectionIndex].rows.length;
        state.sections[sectionIndex].rows.splice(position, 0, {
          id: rowId,
          columns: [[]],
        });

        state.lastRowItemInfo = {
          sectionId,
          rowId,
          hasColumn: false,
        };
      }
    },
    handleAddColumn(
      state,
      action: PayloadAction<{
        sectionId: number;
        rowId: number;
        columnCount: number;
      }>,
    ) {
      const { sectionId, rowId, columnCount } = action.payload;

      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );
      const rowIndex = state.sections[sectionIndex].rows.findIndex(
        row => row.id === rowId,
      );

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

      if (state.lastRowItemInfo && state.lastRowItemInfo.rowId === rowId) {
        state.lastRowItemInfo.hasColumn = true;
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

      if (
        state.lastDropItemInfo &&
        state.lastDropItemInfo.dropZoneId === dropZoneId
      ) {
        state.lastDropItemInfo.hasField = true;
      }
    },
    handleAddDropZone(
      state,
      action: PayloadAction<{
        dropZoneId: string;
        sectionId: number;
        rowId: number;
        columnId: number;
        handlerId?: string;
      }>,
    ) {
      const { dropZoneId, rowId, sectionId, columnId, handlerId } =
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

      if (!isAlreadyEmptyDropZoneExist) {
        currentColumn.splice(dropZoneIndex + 1, 0, {
          id: newDropZoneId,
        });

        state.lastDropItemInfo = {
          columnId,
          sectionId,
          rowId,
          dropZoneId: newDropZoneId,
          hasField: false,
        };

        state.dropZones.push({
          ...initialDraggableState,
          id: newDropZoneId,
        });
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
    removeLastDropZone(state) {
      const { dropZoneId, rowId, sectionId, columnId } =
        state.lastDropItemInfo as LastDropItem;

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

      if (dropZoneIndex && !state.lastDropItemInfo?.hasField) {
        state.sections[sectionIndex].rows[rowIndex].columns[columnIndex].splice(
          dropZoneIndex,
          1,
        );

        state.dropZones.filter(dropZone => dropZone.id !== dropZoneId);

        delete state.lastDropItemInfo;
      }
    },
    removeLastUnusedRow(state) {
      const { rowId, sectionId } = state.lastRowItemInfo as LastRowItem;

      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );

      const rowIndex = state.sections[sectionIndex].rows.findIndex(
        row => row.id === rowId,
      );

      if (state.sections[sectionIndex].rows[rowIndex].columns[0].length === 0) {
        state.sections[sectionIndex].rows.splice(rowIndex, 1);

        delete state.lastRowItemInfo;
      }
    },
    handleFieldData(
      state,
      action: PayloadAction<{
        data: any;
        dropZoneId: string;
      }>,
    ) {
      const { data, dropZoneId } = action.payload;

      state.dropZones = state.dropZones.map((dropZone: DraggableItem) => {
        if (dropZone.id === dropZoneId) {
          return {
            ...dropZone,
            data,
          };
        }
        return dropZone;
      });
    },
  },
});

export const {
  handleAddSection,
  handleRemoveSection,
  handleAddRow,
  handleAddColumn,
  handleFieldDrop,
  handleAddDropZone,
  attachDropZoneId,
  removeLastDropZone,
  removeLastUnusedRow,
  handleFieldData,
} = sectionSlice.actions;
export default sectionSlice.reducer;
