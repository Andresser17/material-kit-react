/* eslint-disable no-unused-vars */
export enum ProductStatus {
  DRAFT = "draft",
  PROPOSED = "proposed",
  PUBLISHED = "published",
  REJECTED = "rejected",
}

export enum FulfillmentStatus {
  NOT_FULFILLED = "not_fulfilled",
  PARTIALLY_FULFILLED = "partially_fulfilled",
  FULFILLED = "fulfilled",
  PARTIALLY_SHIPPED = "partially_shipped",
  SHIPPED = "shipped",
  PARTIALLY_RETURNED = "partially_returned",
  RETURNED = "returned",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action",
}

export enum PaymentStatus {
  NOT_PAID = "not_paid",
  AWAITING = "awaiting",
  CAPTURED = "captured",
  PARTIALLY_REFUNDED = "partially_refunded",
  REFUNDED = "refunded",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action",
}

export enum OrderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  ARCHIVED = "archived",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action",
}

export enum DraftOrderStatus {
  OPEN = "open",
  COMPLETED = "completed",
}

export enum LotStatus {
  ON_STOCK = "on_stock",
  OUT_OF_STOCK = "out_of_stock",
  WAITING_DELIVERY = "waiting_delivery",
  ORDER_PROBLEM = "order_problem",
  FUTURE_PURCHASE = "future_purchase",
}

export enum LotCourier {
  ON_STOCK = "on_stock",
  OUT_OF_STOCK = "out_of_stock",
  WAITING_DELIVERY = "waiting_delivery",
  ORDER_PROBLEM = "order_problem",
  FUTURE_PURCHASE = "future_purchase",
}
