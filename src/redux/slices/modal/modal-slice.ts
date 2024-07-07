import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LotStatus } from "src/enums";
import { IAddLineItemModal } from "src/modals/add-line-item-modal/add-line-item-modal";
import { IAddProductModal } from "src/modals/add-product-modal";
import { IAddProductToDraftOrderModal } from "src/modals/add-product-to-draft-order-modal/add-product-to-draft-order-modal";
import { IAddProductToLotModal } from "src/modals/add-product-to-lot-modal/add-product-to-lot-modal";
import { IAddShippingAddressModal } from "src/modals/add-shipping-address-modal";
import { IAddVariantModal } from "src/modals/add-variant-modal/add-variant-modal";
import { IConfirmActionModal } from "src/modals/confirm-action-modal";
import { ICreateCustomerModal } from "src/modals/create-customer-modal";
import { IEditCustomerModal } from "src/modals/edit-customer-modal";
import { IEditDraftOrderShippingAddressModal } from "src/modals/edit-draft-order-shipping-address-modal";
import { IEditLotSummaryModal } from "src/modals/edit-lot-summary-modal";
import { IEditOptionsModal } from "src/modals/edit-options-modal/edit-options-modal";
import { IEditShippingAddressModal } from "src/modals/edit-shipping-address-modal";
import { IMarkPayDraftOrderModal } from "src/modals/mark-pay-draft-order-modal/mark-pay-draft-order-modal";
import { Modal } from "src/modals/modal-provider";
import { IUpdateLotStatusModal } from "src/modals/update-lot-status-modal/update-lot-status-modal";
import type { RootState } from "src/redux/store";

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
      props: {},
    } as Modal<IEditOptionsModal>,
    {
      id: "add-product-to-draft-order-modal",
      open: false,
      props: { selectedProducts: [] },
    } as Modal<IAddProductToDraftOrderModal>,
    {
      id: "add-product-to-lot-modal",
      open: false,
      props: {},
    } as Modal<IAddProductToLotModal>,
    {
      id: "confirm-action-modal",
      open: false,
      props: { callAction: false, title: "", message: "" },
    } as Modal<IConfirmActionModal>,
    {
      id: "add-product-modal",
      open: false,
      props: { redirect_url: "" },
    } as Modal<IAddProductModal>,
    {
      id: "update-lot-status-modal",
      open: false,
      props: { currentStatus: LotStatus.FUTURE_PURCHASE, lot_id: "" },
    } as Modal<IUpdateLotStatusModal>,
    {
      id: "edit-lot-summary-modal",
      open: false,
      props: {},
    } as Modal<IEditLotSummaryModal>,
    {
      id: "mark-pay-draft-order-modal",
      open: false,
      props: {},
    } as Modal<IMarkPayDraftOrderModal>,
    {
      id: "add-line-item-modal",
      open: false,
      props: { draft_order_id: "" },
    } as Modal<IAddLineItemModal>,
    {
      id: "create-customer-modal",
      open: false,
      props: { redirect_url: "" },
    } as Modal<ICreateCustomerModal>,
    {
      id: "add-shipping-address-modal",
      open: false,
      props: { customer_id: "" },
    } as Modal<IAddShippingAddressModal>,
    {
      id: "edit-shipping-address-modal",
      open: false,
      props: { customer_id: "" },
    } as Modal<IEditShippingAddressModal>,
    {
      id: "edit-draft-order-shipping-address-modal",
      open: false,
      props: { customer_id: "" },
    } as Modal<IEditDraftOrderShippingAddressModal>,
    {
      id: "edit-customer-modal",
      open: false,
      props: {},
    } as Modal<IEditCustomerModal>,
  ],
};

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openModal<T>(
      state: { modals: any[] },
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
    closeModal(
      state,
      action: PayloadAction<{ id: string; resetState: boolean }>,
    ) {
      const index = state.modals.findIndex(
        (modal) => modal.id === action.payload.id,
      );
      if (index != -1) {
        const modal = state.modals[index];
        // reset modal props
        if (modal.props && action.payload.resetState) {
          const originalState = initialState.modals.find(
            (modal) => modal.id === action.payload.id,
          );
          if (originalState && originalState.props)
            modal.props = originalState.props;
        }
        modal.open = false;
      }
    },
    updateProps<T>(
      state: { modals: any[] },
      action: PayloadAction<{ id: string; props?: T }>,
    ) {
      const index = state.modals.findIndex(
        (modal) => modal.id === action.payload.id,
      );
      if (index != -1) {
        state.modals[index].props = action.payload.props;
      }
    },
  },
});

export const { openModal, closeModal, updateProps } = modalSlice.actions;

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
