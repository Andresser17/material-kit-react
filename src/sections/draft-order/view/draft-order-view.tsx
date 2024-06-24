import { DraftOrderRequest } from "@medusajs/types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";

import { DraftOrderStatus } from "src/enums";
import { useCreateDraftOrder } from "src/mutations/use-create-draft-order";
import { useGetDraftOrder } from "src/queries/use-get-draft-order";

import Customer from "../customer";
import OrderDetails from "../order-details";
import Payment from "../payment";
import RawOrder from "../raw-order";
import Shipping from "../shipping";
import Summary from "../summary";

// ----------------------------------------------------------------------

export default function DraftOrderView() {
  const { id } = useParams();
  const {
    data: draft_order,
    isLoading,
    isSuccess,
  } = useGetDraftOrder({
    draft_order_id: id ?? "",
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

  console.log({ draft_order, isSuccess });

  if (isLoading) return <div>Loading!!!</div>;

  if (!isSuccess) {
    return <Navigate to="/404" />;
  }

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
          <OrderDetails data={draft_order} />
          <Payment data={draft_order} />
          <Summary data={draft_order} />
          <Shipping data={draft_order} />
          <Customer data={draft_order} />
          <RawOrder data={draft_order} />
        </Box>
      </Box>
    </form>
  );
}
