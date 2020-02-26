import * as types from './types';

export const login = ({ email, password }) => ({
  type: types.LOGIN,
  payload: {
    path: `login`,
    method: 'POST',
    // For demo purpose
    data: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
  },
  meta: {
    API: true,
    jwt: false,
    label: 'auth',
    loadMore: false,
  },
});

export const logout = () => ({
  type: types.LOGOUT,
  payload: {
    path: `logout`,
    method: 'POST',
  },
  meta: {
    API: true,
    jwt: true,
    label: 'auth',
    loadMore: false,
  },
});

export const resetStore = () => ({
  type: types.RESET_STORE,
  meta: {
    API: false,
    label: 'auth',
    loadMore: false,
  },
});
