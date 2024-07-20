import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProduct } from "src/queries/use-get-product";

import { ProductView } from "src/sections/product/view";

// ----------------------------------------------------------------------

export default function AddProduct() {
  const { id: product_id } = useParams();
  const {
    data: product,
    isSuccess,
    isLoading,
  } = useGetProduct(product_id ?? "");

  if (isLoading) return <div>Loading!!!</div>;

  if (isSuccess)
    return (
      <>
        <Helmet>
          <title>{product.title}</title>
        </Helmet>

        <ProductView product={product} />
      </>
    );
}
