import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { apiMiddleware } from 'store/middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import ui from './ui';
import auth from './auth';
import users from './users';
import meta from './meta';
import transactions from './transactions';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  ui,
  auth,
  users,
  meta,
  transactions,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk, apiMiddleware))
);
export const persistor = persistStore(store);

export default store;
