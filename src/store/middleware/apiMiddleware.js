import { axios } from 'helpers';
import { uiActions } from 'store/ui';
import * as errorTypes from 'store/ui/types';
import * as authTypes from 'store/auth/types';

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);
  const { API, label } = action.meta || {};
  const { path, method, data } = action.payload || {};

  if (!API) {
    return;
  }

  if (API && !path) {
    throw new Error(`'path' not specified for api action ${action.type}`);
  }

  // Notify request start with passing "label"
  // for handling multiple loading spinner
  dispatch(uiActions.fetchingStart(label));
  const url = path;

  return axios({ method, url, data })
    .then(res => {
      next({
        type: `${action.type}_COMPLETED`,
        payload: res.data,
        meta: action.meta,
      });

      // Notify request finished
      dispatch(uiActions.fetchingEnd(label));
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
        next({
          type: authTypes.RESET_STORE,
        });
      }

      next({
        type: errorTypes.SET_ERROR_MESSAGE,
        payload: err.response && err.response.data,
        meta: action.meta,
      });

      // Notify request finished
      dispatch(uiActions.fetchingEnd(label));
    });
};

export default apiMiddleware;
