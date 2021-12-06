import { createSlice } from '@reduxjs/toolkit';

import { Pages } from '../../types';

interface siteData {
  menus: Pages[];
}

const initialState: siteData = {
  menus: [
    {
      id: '001',
      name: 'Meta Data',
      path: '/site/meta-data',
    },
    {
      id: '002',
      name: 'Menus',
      path: '/site/menus',
    },
    {
      id: '003',
      name: 'Settings',
      path: '/site/settings',
    },
    {
      id: '004',
      name: 'SEO',
      path: '/site/seo',
    },
  ],
};

const siteData = createSlice({
  name: 'siteData',
  initialState,
  reducers: {},
});

// export const {} = siteData.actions;
export default siteData.reducer;
