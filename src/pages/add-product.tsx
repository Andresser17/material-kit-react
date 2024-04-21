import { Helmet } from "react-helmet-async";

import { AddProductView } from "src/sections/add-product/view";

// ----------------------------------------------------------------------

export default function AddProduct() {
  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>

      <AddProductView />
    </>
  );
}
