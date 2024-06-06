import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "src/redux/store";

// Define a type for the slice state
export interface ConfirmActionState {
  callAction: boolean;
}

// Define the initial state using that type
const initialState: ConfirmActionState = {
  callAction: false,
};

export const confirmActionSlice = createSlice({
  name: "confirm-action",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCallAction(state, action: PayloadAction<boolean>) {
      state.callAction = action.payload;
    },
  },
});

export const { setCallAction } = confirmActionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getCallAction = (state: RootState) =>
  state.confirmAction.callAction;

export default confirmActionSlice.reducer;
