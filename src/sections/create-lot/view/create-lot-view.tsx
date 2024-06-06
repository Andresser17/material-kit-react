import { Lot } from "@medusajs/types";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { LotStatus } from "src/enums";
import { useCreateLot } from "src/mutations/use-create-lot";

import GeneralInfo from "../general-info";

// ----------------------------------------------------------------------

export default function CreateDraftOrderView() {
  const { handleSubmit, reset, control } = useForm<Lot>({
    defaultValues: {
      name: "",
      description: "",
      status: LotStatus.FUTURE_PURCHASE,
      cost: {
        amount: 0,
        currency: "USD",
        payment: {
          method: "",
          fee: {
            amount: 0,
            currency: "USD",
          },
        },
      },
      items: {
        quantity: 0,
        cost_per_item: 0,
      },
      courier: {
        company: "",
        weight: {
          amount: 0,
          unit: "",
        },
        cost: {
          amount: 0,
          currency: "USD",
        },
        payment: {
          method: "",
          fee: {
            amount: 0,
            currency: "USD",
          },
        },
      },
      ownership: [{ name: "", investment: { amount: 0, currency: "USD" } }],
    },
    mode: "onChange",
  });
  const resetForm = () => {
    reset();
  };
  const createLot = useCreateLot(resetForm);
  const onSubmit: SubmitHandler<Lot> = (data) => {
    console.log({ data });
    // createLot({ lot: data });
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
          <GeneralInfo control={control} />
          {floatingButtons}
        </Box>
      </Box>
    </form>
  );
}
