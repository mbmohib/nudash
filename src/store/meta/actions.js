import * as types from './types';

export const getCategories = ({ param = '' } = {}) => {
  return {
    type: types.GET_CATEGORIES,
    payload: {
      path: `categories/`,
      method: 'GET',
    },
    meta: {
      API: true,
      label: 'meta',
      loadMore: false,
      firebase: true,
    },
  };
};
