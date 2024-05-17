import { useState } from "react";
import { Region } from "@medusajs/types";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { DraftOrderStatus } from "src/enums";
import {
  DraftOrderRequest,
  useCreateDraftOrder,
} from "src/mutations/use-create-draft-order";

import ChooseRegion from "../choose-region";
import CustomerAndShipping from "../customer-and-shipping";

// ----------------------------------------------------------------------

export default function CreateDraftOrderView() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
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

  const floatingButtons = (
    <Box sx={{ position: "fixed", bottom: 10, right: 5, zIndex: 99 }}>
      <Button
        type="submit"
        variant="contained"
        color="success"
        size="large"
        sx={{ mr: 2 }}
      >
        Save
      </Button>
      <Button variant="text" color="error">
        Cancel
      </Button>
    </Box>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: {
              sm: "500px",
            },
            maxWidth: {
              xs: "100%",
            },
          }}
        >
          <ChooseRegion
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
          <CustomerAndShipping
            regionName={selectedRegion?.name ?? ""}
            regionId={selectedRegion?.id ?? ""}
          />
          {floatingButtons}
        </Box>
      </Box>
    </form>
  );
}
