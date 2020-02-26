import * as types from './types';

export const getUsers = ({ param = {}, jwt } = {}) => {
  return {
    type: types.GET_USERS,
    payload: {
      path: `users`,
      method: 'GET',
      param,
    },
    meta: {
      API: true,
      jwt: true,
      label: 'users',
      loadMore: false,
    },
  };
};
