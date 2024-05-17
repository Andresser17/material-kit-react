import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "src/redux/store";
import { Modal } from "src/modals/modal-provider";
import { IAddVariantModal } from "src/modals/add-variant-modal/add-variant-modal";

// Define a type for the slice state
export interface ModalState<T> {
  modals: Modal<T>[];
}

// Define the initial state using that type
const initialState = {
  modals: [
    {
      id: "add-variant-modal",
      open: false,
      props: {},
    } as Modal<IAddVariantModal>,
    {
      id: "edit-options-modal",
      open: false,
      props: null,
    } as Modal<null>,
    {
      id: "add-existing-product-modal",
      open: false,
      props: null,
    } as Modal<null>,
  ],
};

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openModal<T>(
      state: ModalState<T>,
      action: PayloadAction<{ id: string; props?: T }>,
    ) {
      const index = state.modals.findIndex(
        (modal) => modal.id === action.payload.id,
      );
      if (index != -1) {
        state.modals[index].open = true;
        state.modals[index].props = action.payload.props;
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

export const getModalProps = (state: RootState, id: string) => {
  const modal = state.modal.modals.find((modal) => modal.id === id);
  return modal?.props;
};

export default modalSlice.reducer;
