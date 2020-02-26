import produce from 'immer';
import * as types from './types';

const initialState = {
  error: {},
  loading: {},
};

const uiReducers = (state = initialState, action) => {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case types.SET_ERROR_MESSAGE:
        draft.error = {
          [action.meta.label]: payload.error,
        };
        break;
      case types.CLEAR_ERROR_MESSAGE:
        draft.error = '';
        break;
      case types.FETCHING_START:
        draft.loading = {
          [payload.label]: true,
        };
        break;
      case types.FETCHING_END:
        draft.loading = {
          [payload.label]: false,
        };
        break;
      default:
        return state;
    }
  });
};

export default uiReducers;
