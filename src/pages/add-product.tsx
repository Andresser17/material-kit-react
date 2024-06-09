import { Helmet } from "react-helmet-async";

import { ProductView } from "src/sections/add-product/view";

// ----------------------------------------------------------------------

export default function AddProduct() {
  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>

      <ProductView />
    </>
  );
}
