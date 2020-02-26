import produce from 'immer';
import * as types from './types';

const initialState = {
  jwt: null,
  user: {},
};

const authReducers = function(state = initialState, action) {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case types.LOGIN_COMPLETED:
        draft.jwt = payload.token;
        draft.user = {
          fullName: 'John Doe',
        };
        break;
      default:
        return state;
    }
  });
};

export default authReducers;
