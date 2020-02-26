import { axios } from 'helpers';
import { authActions } from 'store/auth';

const authMiddleware = ({ dispatch, getState }) => next => action => {
  next(action);
  const { jwt } = action.meta || {};

  if (!jwt) {
    return;
  }

  if (action.type === 'AUTH/LOGOUT_COMPLETED') {
    dispatch(authActions.resetStore());
  } else {
    const store = getState();
    const token = store.auth.jwt;

    axios.defaults.headers.common['Authorization'] = token;
  }
};

export default authMiddleware;
