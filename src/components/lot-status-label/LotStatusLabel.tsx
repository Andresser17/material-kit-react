import { MouseEventHandler } from "react";

import { SxProps } from "@mui/material";

import { LotStatus } from "src/enums";

import Label from "src/components/label";

export interface ILotStatusLabel {
  status: LotStatus;
  onClick?: MouseEventHandler;
  sx?: SxProps;
}

export default function LotStatusLabel({ status, ...props }: ILotStatusLabel) {
  switch (status) {
    case LotStatus.ON_STOCK:
      // setColor("success");
      // setLabel("On Stock");
      return (
        <Label color="success" {...props}>
          On Stock
        </Label>
      );
    case LotStatus.OUT_OF_STOCK:
      // setColor("error");
      // setLabel("Out of Stock");
      return (
        <Label color="error" {...props}>
          Out of Stock
        </Label>
      );
    case LotStatus.WAITING_DELIVERY:
      // setColor("info");
      // setLabel("Waiting Delivery");
      return (
        <Label color="info" {...props}>
          Waiting Delivery
        </Label>
      );
    case LotStatus.ORDER_PROBLEM:
      // setColor("warning");
      // setLabel("Order Problem");
      return (
        <Label color="warning" {...props}>
          Order Problem
        </Label>
      );
    default:
      // setColor("secondary");
      // setLabel("Future Purchase");
      return (
        <Label color="secondary" {...props}>
          Future Purchase
        </Label>
      );
  }
}
