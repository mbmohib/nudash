import * as types from './types';

export const login = ({ email_or_phone, password }) => ({
  type: types.LOGIN,
  payload: {
    path: `auth/login/`,
    method: 'POST',
    data: { email_or_phone, password },
  },
  meta: {
    API: true,
    jwt: false,
    label: 'auth',
    loadMore: false,
  },
});

export const resetPassword = ({ code, password, confirm_password }) => ({
  type: types.RESET_PASSWORD,
  meta: {
    async: true,
    blocking: true,
    path: `auth/password-reset/`,
    method: 'POST',
    body: { code, password, confirm_password },
  },
});

export const logout = jwt => {
  return {
    type: types.LOGOUT,
    meta: {
      async: true,
      blocking: true,
      path: `user/logout/`,
      method: 'POST',
      body: {},
      jwt,
    },
  };
};

export const setUserToken = token => ({
  type: types.SET_USER_TOKEN,
  payload: token,
});

export const setLoggedInUser = user => ({
  type: types.SET_LOGGED_IN_USER,
  payload: user,
});

export const initializeAuth = () => ({
  type: types.INITIALIZE,
});
