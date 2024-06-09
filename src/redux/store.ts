import { configureStore } from "@reduxjs/toolkit";

import addProductSlice from "./slices/add-product";
import modalSlice from "./slices/modal/modal-slice";
import confirmActionSlice from "./slices/confirm-action";
import productOptionsSlice from "./slices/product-options";
import addProductToLotSlice from "./slices/add-product-to-lot";
import addExistingProductSlice from "./slices/add-existing-product";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    productOptions: productOptionsSlice,
    addExistingProduct: addExistingProductSlice,
    addProductToLot: addProductToLotSlice,
    confirmAction: confirmActionSlice,
    addProduct: addProductSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
