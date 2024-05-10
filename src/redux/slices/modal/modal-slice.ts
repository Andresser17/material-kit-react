import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "src/redux/store";
import { Modal } from "src/modals/modal-provider";

// Define a type for the slice state
export interface ModalState {
  modals: Modal[];
}

// Define the initial state using that type
const initialState: ModalState = {
  modals: [
    {
      src: "src/sections/add-product/add-variant-modal",
      id: "add-variant-modal",
      open: false,
    },
  ],
};

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ id: string; meta: Record<string, unknown> }>,
    ) => {
      const index = state.modals.findIndex(
        (modal) => modal.id === action.payload.id,
      );
      console.log({ index });
      if (index != -1) {
        state.modals[index].open = true;
        state.modals[index].meta = action.payload.meta;
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const index = state.modals.findIndex(
        (modal) => modal.id === action.payload,
      );
      if (index != -1) {
        state.modals[index].open = false;
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getModalsList = (state: RootState) =>
  state.modal.modals.filter((modal) => modal.open);

export const isModalOpen = (state: RootState, id: string) => {
  const modal = state.modal.modals.find((modal) => modal.id === id);
  return modal?.open ?? false;
};

export const getModalMeta = (state: RootState, id: string) => {
  const modal = state.modal.modals.find((modal) => modal.id === id);
  return modal?.meta;
};

export default modalSlice.reducer;
