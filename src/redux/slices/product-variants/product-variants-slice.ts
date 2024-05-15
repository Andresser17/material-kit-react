import { ProductOptionRequest } from "@medusajs/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "src/redux/store";

// Define a type for the slice state
export interface productVariantsState {
  variants: ProductOptionRequest[];
}

// Define the initial state using that type
const initialState: productVariantsState = {
  variants: [],
};

export const productVariantsSlice = createSlice({
  name: "product-variants",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addOption(state, action: PayloadAction<ProductOptionRequest>) {
      state.options.push(action.payload);
    },
    setOptions(state, action: PayloadAction<ProductOptionRequest[]>) {
      state.options = action.payload;
    },
    updateOption(
      state,
      action: PayloadAction<{ id: string; newTitle: string }>,
    ) {
      const index = state.options.findIndex(
        (option) => option.id === action.payload.id,
      );
      state.options[index].title = action.payload.newTitle;
    },
    deleteOption(state, action: PayloadAction<string>) {
      state.options = state.options.filter(
        (option) => option.id != action.payload,
      );
    },
  },
});

export const { addOption, setOptions, updateOption, deleteOption } =
  productVariantsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getVariants = (state: RootState) => state.productVariants.variants;

export default productVariantsSlice.reducer;
