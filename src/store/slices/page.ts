import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { FieldType } from '../../config';
import { DraggableItem, FieldData, Section } from '../../types';

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

interface SectionState extends Section {
  lastDropItemInfo?: LastDropItem;
  lastRowItemInfo?: LastRowItem;
}

const initialState: SectionState = {
  pageId: '001',
  name: 'home',
  path: 'page',
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
  lastRowItemInfo: {
    sectionId: 0,
    rowId: 0,
    hasColumn: false,
  },
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setInitialState(state, action) {
      return action.payload;
    },
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
        const newRowId = state.sections[sectionIndex].rows.length;
        state.sections[sectionIndex].rows.splice(position, 0, {
          id: newRowId,
          columns: [[]],
        });

        state.lastRowItemInfo = {
          sectionId,
          rowId: newRowId,
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

      for (let i = 0; i < columnCount; i += 1) {
        const newDropZoneId = nanoid();

        newColumns.push([
          {
            id: newDropZoneId,
          },
        ]);
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
        sectionId: number;
        rowId: number;
        columnId: number;
      }>,
    ) {
      const { fieldType, dropZoneId, sectionId, rowId, columnId } =
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

      state.sections[sectionIndex].rows[rowIndex].columns[columnIndex] =
        state.sections[sectionIndex].rows[rowIndex].columns[columnIndex].map(
          (dropZone: DraggableItem) => {
            if (dropZone.id === dropZoneId) {
              return {
                ...dropZone,
                fieldType,
              };
            }
            return dropZone;
          },
        );

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

      if (!nextDropZone || nextDropZone.fieldType) {
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

        delete state.lastDropItemInfo;
      }
    },
    removeLastUnusedRow(state) {
      const { rowId, sectionId } = state.lastRowItemInfo as LastRowItem;

      if (sectionId || (sectionId === 0 && rowId) || rowId === 0) {
        const sectionIndex = state.sections.findIndex(
          section => section.id === sectionId,
        );

        const rowIndex = state.sections[sectionIndex].rows.findIndex(
          row => row.id === rowId,
        );

        if (
          state.sections[sectionIndex].rows[rowIndex].columns[0].length === 0
        ) {
          state.sections[sectionIndex].rows.splice(rowIndex, 1);

          delete state.lastRowItemInfo;
        }
      }
    },
    saveFieldData(
      state,
      action: PayloadAction<{
        data: FieldData;
        dropZoneId: string;
        sectionId: number;
        rowId: number;
        columnId: number;
      }>,
    ) {
      const { data, dropZoneId, sectionId, rowId, columnId } = action.payload;
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
        state.sections[sectionIndex].rows[rowIndex].columns[columnIndex].map(
          (dropZone: DraggableItem) => {
            if (dropZone.id === dropZoneId) {
              return {
                ...dropZone,
                data,
              };
            }
            return dropZone;
          },
        );
    },
    removeField(
      state,
      action: PayloadAction<{
        dropZoneId: string;
        sectionId: number;
        rowId: number;
        columnId: number;
      }>,
    ) {
      const { dropZoneId, sectionId, rowId, columnId } = action.payload;
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
        state.sections[sectionIndex].rows[rowIndex].columns[columnIndex].map(
          (dropZone: DraggableItem) => {
            if (dropZone.id === dropZoneId) {
              return {
                ...dropZone,
                data: undefined,
                fieldType: undefined,
              };
            }
            return dropZone;
          },
        );
    },
    removeRow(
      state,
      action: PayloadAction<{
        sectionId: number;
        rowId: number;
      }>,
    ) {
      const { sectionId, rowId } = action.payload;
      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );

      if (state.sections[sectionIndex].rows.length > 1) {
        state.sections[sectionIndex].rows = state.sections[
          sectionIndex
        ].rows.filter(row => row.id !== rowId);
      }
    },
    removeColumn(
      state,
      action: PayloadAction<{
        sectionId: number;
        rowId: number;
        columnId: number;
      }>,
    ) {
      const { sectionId, rowId, columnId } = action.payload;
      const sectionIndex = state.sections.findIndex(
        section => section.id === sectionId,
      );
      const rowIndex = state.sections[sectionIndex].rows.findIndex(
        row => row.id === rowId,
      );

      const columns = state.sections[sectionIndex].rows[
        rowIndex
      ].columns.filter((_, index) => index !== columnId);

      if (columns.length) {
        state.sections[sectionIndex].rows[rowIndex].columns = columns;
      } else {
        state.sections[sectionIndex].rows[rowIndex].columns = [[]];
      }
    },
    handleSectionOrder(
      state,
      action: PayloadAction<{
        hoveredIndex: number;
        draggedIndex: number;
      }>,
    ) {
      const { hoveredIndex, draggedIndex } = action.payload;

      state.sections.splice(
        hoveredIndex,
        0,
        state.sections.splice(draggedIndex, 1)[0],
      );
    },
  },
});

export const {
  setInitialState,
  handleAddSection,
  handleRemoveSection,
  handleAddRow,
  handleAddColumn,
  handleFieldDrop,
  handleAddDropZone,
  attachDropZoneId,
  removeLastDropZone,
  removeLastUnusedRow,
  saveFieldData,
  removeField,
  removeRow,
  removeColumn,
  handleSectionOrder,
} = pageSlice.actions;
export default pageSlice.reducer;
