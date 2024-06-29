import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetOrder } from "src/queries/use-get-order";

import { OrderView } from "src/sections/order/view";

// ----------------------------------------------------------------------

export default function DraftOrderPage() {
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useGetOrder({ order_id: id ?? "" });

  if (isLoading) return <div>Loading!!!</div>;

  return (
    <>
      <Helmet>
        <title>Order Details</title>
      </Helmet>

      {isSuccess && <OrderView order={data} />}
    </>
  );
}
