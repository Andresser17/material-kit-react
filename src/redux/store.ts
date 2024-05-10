import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "./slices/modal/modal-slice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
