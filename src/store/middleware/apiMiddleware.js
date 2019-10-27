import firebase from 'firebase/app';
import 'firebase/database';

import { uiActions } from 'store/ui';
import * as errorTypes from 'store/ui/types';

const env = process.env.NODE_ENV || 'development';

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);
  const { API, label } = action.meta || {};
  const { path, data } = action.payload || {};

  if (!API) {
    return;
  }

  if (API && !path) {
    throw new Error(`'path' not specified for api action ${action.type}`);
  }

  // Notify request start with passing "label"
  // for handling multiple loading spinner
  dispatch(uiActions.fetchingStart(label));

  const ref = firebase.database().ref(`/${path}`);
  return ref
    .once('value')
    .then(res => {
      next({
        type: `${action.type}_completed`,
        payload: res.val(),
        meta: action.meta,
      });

      // Notify request finished
      dispatch(uiActions.fetchingEnd(label));
    })
    .catch(err => {
      next({
        type: errorTypes.SET_ERROR_MESSAGE,
        payload: err,
        meta: action.meta,
      });

      // Notify request finished
      dispatch(uiActions.fetchingEnd(label));
    });
};

export default apiMiddleware;
