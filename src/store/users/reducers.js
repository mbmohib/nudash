import produce from 'immer';
import * as types from './types';

const initialState = {
  user: {},
  users: {},
};

const userReducers = function(state = initialState, action) {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case types.GET_USERS_COMPLETED:
        draft.users = payload;
        break;
      default:
        return state;
    }
  });
};

export default userReducers;
