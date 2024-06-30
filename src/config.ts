export const QUERY_KEY = {
  user: "user",
  product: "product",
  regions: "regions",
  list_products: "list_products",
  list_draft_orders: "list_draft_orders",
  product_type: "productType",
  product_option: "productOption",
  product_variant: "productVariant",
  order: "order",
  draft_order: "draftOrder",
  list_lots: "list_lots",
  get_lot: "get_lot",
  tag: "tag",
  collection: "collection",
  customers: "customers",
  shipping_options: "shipping_options",
};

export const MUTATION_KEY = {
  add_product: "add_product",
  update_product: "update_product",
  delete_product: "delete_product",
  add_product_option: "add_product_option",
  update_product_option: "update_product_option",
  delete_product_option: "delete_product_option",
  add_product_variant: "add_product_variant",
  delete_product_variant: "delete_produdct_variant",
  delete_draft_order: "delete_draft_order",
  create_draft_order: "create_draft_order",
  create_lot: "create_lot",
  delete_lot: "delete_lot",
  update_lot: "update_lot",
  add_lot_product: "add_lot_product",
  remove_lot_product: "remove_lot_product",
  create_line_item: "create_line_item",
};

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
