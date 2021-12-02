import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { SiteMenu } from '../../types';

const initialState = [] as SiteMenu[];

const menuSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    setMenus(state, action: PayloadAction<SiteMenu[]>) {
      return action.payload;
    },
    addMenu(state) {
      state.push({
        id: nanoid(),
        label: 'unnamed',
        url: '/',
        isOpenNew: false,
      });
    },
    updateMenu(
      state,
      action: PayloadAction<{
        id: string;
        data: SiteMenu;
      }>,
    ) {
      const { id, data } = action.payload;

      return state.map(menu => {
        if (menu.id === id) {
          return data;
        }

        return menu;
      });
    },
    deleteMenu(state, action: PayloadAction<string>) {
      const id = action.payload;

      return state.filter(menu => menu.id !== id);
    },
    changeOrder(
      state,
      action: PayloadAction<{ draggedIndex: number; hoveredIndex: number }>,
    ) {
      const { draggedIndex, hoveredIndex } = action.payload;

      state.splice(hoveredIndex, 0, state.splice(draggedIndex, 1)[0]);
    },
  },
});

export const { addMenu, updateMenu, deleteMenu, changeOrder, setMenus } =
  menuSlice.actions;
export default menuSlice.reducer;
