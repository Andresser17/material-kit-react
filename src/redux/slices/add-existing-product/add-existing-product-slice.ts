import { ProductVariant } from "@medusajs/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "src/redux/store";

// Define a type for the slice state
export interface AddExistingProductState {
  selected: ProductVariant[];
}

// Define the initial state using that type
const initialState: AddExistingProductState = {
  selected: [],
};

export const addExistingProductSlice = createSlice({
  name: "add-existing-product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addSelected(state, action: PayloadAction<ProductVariant>) {
      state.selected.push(action.payload);
    },
    setSelection(state, action: PayloadAction<ProductVariant[]>) {
      state.selected = action.payload;
    },
    removeSelected(state, action: PayloadAction<string>) {
      state.selected = state.selected.filter(
        (option) => option.id != action.payload,
      );
    },
  },
});

export const { addSelected, setSelection, removeSelected } =
  addExistingProductSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getSelectedProducts = (state: RootState) =>
  state.addExistingProduct.selected;

export default addExistingProductSlice.reducer;
