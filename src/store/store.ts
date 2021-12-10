import { configureStore } from '@reduxjs/toolkit';

import menus from './slices/menus.slice';
import page from './slices/page.slice';

export const store = configureStore({
  reducer: {
    page,
    menus,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
