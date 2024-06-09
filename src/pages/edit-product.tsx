import { Helmet } from "react-helmet-async";

import { ProductView } from "src/sections/add-product/view";

// ----------------------------------------------------------------------

export default function EditProductPage() {
  return (
    <>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>

      <ProductView />
    </>
  );
}
