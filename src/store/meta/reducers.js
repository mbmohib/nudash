import produce from 'immer';
import * as types from './types';

const initialState = {
  categories: [],
};

const metaReducers = function(state = initialState, action) {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case types.GET_CATEGORIES_COMPLETED:
        payload.forEach(function(doc) {
          draft.categories.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        break;
      default:
        return state;
    }
  });
};

export default metaReducers;
