import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

import { Auth, Token } from '../../types';

const initialState = {
  isAuthorized: false,
} as Auth;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Omit<Auth, 'isAuthorized'>>) {
      const { token, ...rest } = action.payload;
      if (!token) {
        return state;
      }

      const decoded: Token = jwtDecode(token);

      return { isAuthorized: true, expiredIn: decoded.exp, token, ...rest };
    },
    removeAuth() {
      return { isAuthorized: false, user: {} };
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
