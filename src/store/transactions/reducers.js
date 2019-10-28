import produce from 'immer';
import * as types from './types';

const initialState = {
  transactions: {},
};

const transactionReducers = function(state = initialState, action) {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case types.GET_TRANSACTIONS_COMPLETED:
        draft.transactions = payload.slice(0, 10);
        break;
    }
  });
};

export default transactionReducers;
