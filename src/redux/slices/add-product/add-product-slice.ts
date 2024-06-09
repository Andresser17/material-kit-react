import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "src/redux/store";

// Define a type for the slice state
export interface AddProductState {
  title: string;
  redirect: boolean;
}

// Define the initial state using that type
const initialState: AddProductState = {
  title: "",
  redirect: false,
};

export const addProductSlice = createSlice({
  name: "add-product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProductName(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setRedirect(state, action: PayloadAction<boolean>) {
      state.redirect = action.payload;
    },
  },
});

export const { setProductName, setRedirect } = addProductSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getProductName = (state: RootState) => state.addProduct.title;

export const getRedirect = (state: RootState) => state.addProduct.redirect;

export default addProductSlice.reducer;
