import { Helmet } from "react-helmet-async";

import { ProductsView } from "src/sections/products/view";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
