import { Helmet } from "react-helmet-async";

import { ProductView } from "src/sections/product/view";

// ----------------------------------------------------------------------

export default function AddProduct() {
  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>

      <ProductView />
    </>
  );
}
