import { Lot } from "@medusajs/types";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { LotStatus } from "src/enums";
import { useCreateLot } from "src/mutations/use-create-lot";

import { useEffect } from "react";
import GeneralInfo from "../general-info";

// ----------------------------------------------------------------------

export interface LotForm extends Lot {
  total_cost: number;
}

export default function CreateLotView() {
  const { handleSubmit, reset, control, getValues, setValue, watch } =
    useForm<LotForm>({
      defaultValues: {
        total_cost: 0,
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
    createLot({ lot: data });
  };

  const watchItemsQuantity = watch("items.quantity");
  const watchLotCost = watch("cost.amount");
  const watchFeeAmount = watch("cost.payment.fee.amount");
  const watchCourierCost = watch("courier.cost.amount");
  const watchCourierCostFee = watch("courier.payment.fee.amount");
  useEffect(() => {
    if (
      watchLotCost ||
      watchFeeAmount ||
      watchCourierCost ||
      watchCourierCostFee
    ) {
      setValue(
        "total_cost",
        Number(watchLotCost) +
          Number(watchFeeAmount) +
          Number(watchCourierCost) +
          Number(watchCourierCostFee),
      );

      if (watchItemsQuantity > 0) {
        setValue(
          "items.cost_per_item",
          getValues("total_cost") / Number(watchItemsQuantity),
        );
      }
    }
  }, [
    watchItemsQuantity,
    watchLotCost,
    watchFeeAmount,
    watchCourierCost,
    watchCourierCostFee,
  ]);

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
