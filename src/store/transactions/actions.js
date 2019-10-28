import * as types from './types';

export const getTransactions = ({ param = {} } = {}) => {
  console.log('getTransactions');
  return {
    type: types.GET_TRANSACTIONS,
    payload: {
      path: `https://jsonplaceholder.typicode.com/albums`,
      method: 'GET',
    },
    meta: {
      API: true,
      label: 'transactions',
      loadMore: false,
    },
  };
};
