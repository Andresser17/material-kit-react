import { LotStatus } from "src/enums";

import Label from "src/components/label";

export interface ILotStatusLabel {
  status: LotStatus;
}

export default function LotStatusLabel({ status }: ILotStatusLabel) {
  switch (status) {
    case LotStatus.ON_STOCK:
      return <Label color="success">On Stock</Label>;
    case LotStatus.OUT_OF_STOCK:
      return <Label color="error">Out of Stock</Label>;
    case LotStatus.WAITING_DELIVERY:
      return <Label color="info">Waiting Delivery</Label>;
    case LotStatus.ORDER_PROBLEM:
      return <Label color="warning">Order Problem</Label>;
    case LotStatus.FUTURE_PURCHASE:
      return <Label color="secondary">Future Purchase</Label>;
    default:
      return <Label color="secondary">Future Purchase</Label>;
  }
}
