import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";

import { DraftOrderStatus } from "src/enums";
import {
  DraftOrderRequest,
  useCreateDraftOrder,
} from "src/mutations/use-create-draft-order";

import Payment from "../payment";
import Summary from "../summary";
import Shipping from "../shipping";
import Customer from "../customer";
import RawOrder from "../raw-order";
import OrderDetails from "../order-details";

// ----------------------------------------------------------------------

export default function DraftOrderView() {
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
    // if (location.state?.product) {
    //   upadteProductMutation({
    //     id: location.state?.product.id,
    //     product: { ...data, status },
    //     // toUpload: images,
    //   });
    //   return;
    // }
    createDraftOrder({
      newDraftOrder: { ...data, status },
    });
  };

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
          <OrderDetails status={DraftOrderStatus.OPEN} />
          <Payment />
          <Summary />
          <Shipping />
          <Customer />
          <RawOrder />
        </Box>
      </Box>
    </form>
  );
}
