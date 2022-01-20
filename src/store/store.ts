import { configureStore } from '@reduxjs/toolkit';

import auth from './slices/auth.slice';
import menus from './slices/menus.slice';
import page from './slices/page.slice';

export const store = configureStore({
  reducer: {
    page,
    menus,
    auth,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// expose store when run in Cypress
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((window as any).Cypress) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).store = store;
}
