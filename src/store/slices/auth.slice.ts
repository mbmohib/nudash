import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Auth } from '../../types';

const initialState = {
  isAuthorized: false,
} as Auth;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Omit<Auth, 'isAuthorized'>>) {
      return { isAuthorized: true, ...action.payload };
    },
    removeAuth() {
      return { isAuthorized: false, user: {} };
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
