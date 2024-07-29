export const QUERY_KEY = {
  user: "user",
  product: "product",
  regions: "regions",
  list_customers: "list_customers",
  list_products: "list_products",
  list_draft_orders: "list_draft_orders",
  list_warranties: "list_warranties",
  list_barcodes: "list_barcodes",
  product_type: "productType",
  product_option: "productOption",
  product_variant: "productVariant",
  order: "order",
  draft_order: "draftOrder",
  list_lots: "list_lots",
  get_lot: "get_lot",
  tag: "tag",
  collection: "collection",
  shipping_options: "shipping_options",
  customer: "customer",
};

export const MUTATION_KEY = {
  add_product: "add_product",
  update_product: "update_product",
  delete_product: "delete_product",

  add_product_option: "add_product_option",
  update_product_option: "update_product_option",
  delete_product_option: "delete_product_option",

  add_product_variant: "add_product_variant",
  update_product_variant: "update_product_variant",
  delete_product_variant: "delete_produdct_variant",

  create_draft_order: "create_draft_order",
  delete_draft_order: "delete_draft_order",
  update_draft_order: "update_draft_order",
  mark_pay_draft_order: "mark_pay_draft_order",

  create_lot: "create_lot",
  delete_lot: "delete_lot",
  update_lot: "update_lot",

  add_lot_product: "add_lot_product",
  remove_lot_product: "remove_lot_product",

  create_line_item: "create_line_item",
  delete_line_item: "delete_line_item",
  update_line_item: "update_line_item",

  create_customer: "create_customer",
  update_customer: "update_customer",

  add_customer_shipping_address: "add_customer_shipping_address",
  edit_customer_shipping_address: "edit_customer_shipping_address",

  create_warranty: "create_warranty",
  delete_warranty: "delete_warranty",
  update_warranty: "update_warranty",

  create_barcode: "create_barcode",
  delete_barcode: "delete_barcode",
  update_barcode: "update_barcode",

  complete_order: "complete_order",
  cancel_order: "cancel_order",
  archive_order: "archive_order",
};

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
