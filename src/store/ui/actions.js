import * as types from './types';

export const fetchingStart = type => {
  return {
    type: types.FETCHING_START,
    payload: { label: type },
  };
};

export const fetchingEnd = type => {
  return {
    type: types.FETCHING_END,
    payload: { label: type },
  };
};

export const setErrorMessage = ({ data }) => {
  return {
    type: types.SET_ERROR_MESSAGE,
    payload: {
      data,
    },
  };
};
