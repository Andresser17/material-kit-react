import { MouseEventHandler } from "react";

import { SxProps } from "@mui/material";

import { OrderStatus } from "src/enums";

import Label from "src/components/label";

export interface IOrderStatusLabel {
  status: OrderStatus;
  onClick?: MouseEventHandler;
  sx?: SxProps;
}

export default function OrderStatusLabel({
  status,
  ...props
}: IOrderStatusLabel) {
  switch (status) {
    case OrderStatus.COMPLETED:
      return (
        <Label color="success" {...props}>
          Completed
        </Label>
      );
    case OrderStatus.CANCELED:
      return (
        <Label color="error" {...props}>
          Canceled
        </Label>
      );
    case OrderStatus.PENDING:
      return (
        <Label color="info" {...props}>
          Pending
        </Label>
      );
    case OrderStatus.REQUIRES_ACTION:
      return (
        <Label color="warning" {...props}>
          Requires Action
        </Label>
      );
    default:
      return (
        <Label color="secondary" {...props}>
          Archived
        </Label>
      );
  }
}
