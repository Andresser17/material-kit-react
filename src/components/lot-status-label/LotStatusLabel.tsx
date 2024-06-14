import { useState, MouseEventHandler } from "react";

import { SxProps } from "@mui/material";

import { LotStatus } from "src/enums";

import Label from "src/components/label";

import { Color } from "../label";

export interface ILotStatusLabel {
  status: LotStatus;
  onClick?: MouseEventHandler;
  sx?: SxProps;
}

export default function LotStatusLabel({ status, ...props }: ILotStatusLabel) {
  const [color, setColor] = useState<Color>("secondary");
  const [label, setLabel] = useState("Future Purchase");

  switch (status) {
    case LotStatus.ON_STOCK:
      setColor("success");
      setLabel("On Stock");
      break;
    case LotStatus.OUT_OF_STOCK:
      setColor("error");
      setLabel("Out of Stock");
      break;
    case LotStatus.WAITING_DELIVERY:
      setColor("info");
      setLabel("Waiting Delivery");
      break;
    case LotStatus.ORDER_PROBLEM:
      setColor("warning");
      setLabel("Order Problem");
      break;
    case LotStatus.FUTURE_PURCHASE:
      setColor("secondary");
      setLabel("Future Purchase");
      break;
  }

  return (
    <Label color={color} {...props}>
      {label}
    </Label>
  );
}
