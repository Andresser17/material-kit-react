import { LotStatus } from "src/enums";

export const paymentMethods = [
  { inputValue: "", id: "pago-movil", label: "Pago Movil" },
  { inputValue: "", id: "bancamiga", label: "Bancamiga" },
  {
    inputValue: "",
    id: "exterior",
    label: "Banco Exterior",
  },
  {
    inputValue: "",
    id: "venezuela",
    label: "Banco de Venezuela",
  },
  { inputValue: "", id: "bnc", label: "BNC" },
  { inputValue: "", id: "zinli", label: "Zinli" },
  { inputValue: "", id: "zelle", label: "Zelle" },
];

export const couriers = [
  { inputValue: "", id: "zoom", label: "Zoom" },
  {
    inputValue: "",
    id: "liberty-express",
    label: "Liberty Express",
  },
  { inputValue: "", id: "ock21", label: "Oceanika 21" },
];

export const status = [
  { inputValue: "", id: LotStatus.ON_STOCK, label: "On Stock" },
  {
    inputValue: "",
    id: LotStatus.OUT_OF_STOCK,
    label: "Out of Stock",
  },
  {
    inputValue: "",
    id: LotStatus.WAITING_DELIVERY,
    label: "Waiting Delivery",
  },
  {
    inputValue: "",
    id: LotStatus.ORDER_PROBLEM,
    label: "Order Problem",
  },
  {
    inputValue: "",
    id: LotStatus.FUTURE_PURCHASE,
    label: "Future Purchase",
  },
];
