import produce from 'immer';
import * as types from './types';

const initialState = {
  categories: {},
  locations: {},
  userTypes: [
    {
      value: 1,
      label: 'Freelancer',
    },
    {
      value: 0,
      label: 'Employer',
    },
  ],
  userStatus: [
    {
      value: 1,
      label: 'Active',
    },
    {
      value: 0,
      label: 'Banned',
    },
  ],
};

const metaReducers = function(state = initialState, action) {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case types.GET_CATEGORIES:
        break;
    }
  });
};

export default metaReducers;
