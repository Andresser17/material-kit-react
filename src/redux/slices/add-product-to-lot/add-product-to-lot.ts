import { ProductVariant } from "@medusajs/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "src/redux/store";

// Define a type for the slice state
export interface AddProductToLotState {
  selected: ProductVariant[];
}

// Define the initial state using that type
const initialState: AddProductToLotState = {
  selected: [],
};

export const addProductToLotSlice = createSlice({
  name: "add-product-to-lot",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // addSelected(state, action: PayloadAction<ProductVariant[]>) {
    //   state.selected = [...state.selected, ...action.payload];
    // },
    addSelected(state, action: PayloadAction<ProductVariant[]>) {
      state.selected = action.payload;
    },
    removeSelected(state, action: PayloadAction<string>) {
      state.selected = state.selected.filter(
        (option) => option.id != action.payload,
      );
    },
  },
});

export const { addSelected, removeSelected } = addProductToLotSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getSelectedProducts = (state: RootState) =>
  state.addProductToLot.selected;

export default addProductToLotSlice.reducer;
