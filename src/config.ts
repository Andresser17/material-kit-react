export const QUERY_KEY = {
  user: "user",
  product: "product",
  productType: "productType",
  productOption: "productOption",
  order: "order",
  draftOrder: "draftOrder",
  tag: "tag",
  collection: "collection",
};

export const MUTATION_KEY = {
  add_product: "add_product",
  update_product: "update_product",
  delete_product: "delete_product",
  add_product_option: "add_product_option",
  update_product_option: "update_product_option",
  delete_product_option: "delete_product_option",
  create_draft_order: "create_draft_order",
};

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
