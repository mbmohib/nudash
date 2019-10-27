import * as types from './types';

export const getUsers = ({ param = {}, jwt } = {}) => {
  return {
    type: types.GET_USERS,
    payload: {
      path: `user/list/`,
      method: 'GET',
      data: '',
      param,
    },
    meta: {
      API: true,
      jwt: jwt,
      label: 'users',
      loadMore: false,
    },
  };
};
