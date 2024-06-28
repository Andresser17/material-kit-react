import { DraftOrderRequest, DraftOrderResponse } from "@medusajs/types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Box from "@mui/material/Box";

import { DraftOrderStatus } from "src/enums";
import { useCreateDraftOrder } from "src/mutations/use-create-draft-order";

import Customer from "../customer";
import OrderDetails from "../order-details";
import Payment from "../payment";
import RawOrder from "../raw-order";
import Shipping from "../shipping";
import Summary from "../summary";

// ----------------------------------------------------------------------

export interface PaymentAmounts {
  [key: string]: string;
  total: string;
  subtotal: string;
  shipping_total: string;
  tax_total: string;
}

interface IDraftOrderView {
  draftOrder: DraftOrderResponse;
}

export default function DraftOrderView({ draftOrder }: IDraftOrderView) {
  const [paymentAmounts, setPaymentAmounts] = useState<PaymentAmounts>({
    total: "0.00",
    subtotal: "0.00",
    shipping_total: "0.00",
    tax_total: "0.00",
  });
  const [status, setStatus] = useState(DraftOrderStatus.OPEN);
  const { handleSubmit, reset } = useForm<DraftOrderRequest>({
    defaultValues: {
      email: "",
      region_id: "",
      shipping_methods: [],
      status: DraftOrderStatus.OPEN,
      billing_address: {},
      shipping_address: {
        first_name: "",
        last_name: "",
        phone: "",
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        country_code: "ve",
        province: "",
        postal_code: "",
        metadata: {},
      },
      items: [],
      discounts: [],
      customer_id: "",
      no_notification_order: false,
      metadata: {},
    },
    mode: "onChange",
  });
  const resetForm = () => {
    reset();
    setStatus(DraftOrderStatus.OPEN);
  };
  const createDraftOrder = useCreateDraftOrder(resetForm);
  const onSubmit: SubmitHandler<DraftOrderRequest> = (data) => {
    createDraftOrder({
      newDraftOrder: { ...data, status },
    });
  };

  useEffect(() => {
    if (draftOrder) {
      setPaymentAmounts((prev) => {
        const newState = { ...prev };
        Object.keys(paymentAmounts).forEach((key) => {
          let amountArr = draftOrder.cart[key].toString().split("");
          amountArr = amountArr.slice(0, amountArr.length - 2).join("");
          if (amountArr.length === 0) amountArr = ["0"];
          const amount = `${amountArr}.00`;
          newState[key] = amount;
        });

        return newState;
      });
    }
  }, [draftOrder]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            width: {
              sm: "600px",
              md: "660px",
            },
            maxWidth: {
              xs: "100%",
            },
          }}
        >
          <OrderDetails data={draftOrder} paymentAmounts={paymentAmounts} />
          <Payment
            draftOrderId={draftOrder.id}
            paymentAmounts={paymentAmounts}
          />
          <Summary data={draftOrder} paymentAmounts={paymentAmounts} />
          <Shipping data={draftOrder} />
          <Customer data={draftOrder} />
          <RawOrder data={draftOrder} />
        </Box>
      </Box>
    </form>
  );
}
