import { Helmet } from "react-helmet-async";
import { useListOrders } from "src/queries/use-list-orders";

import { OrdersView } from "src/sections/orders/view";

// ----------------------------------------------------------------------

export default function OrdersPage() {
  const { data, isLoading, isSuccess } = useListOrders({});

  if (isLoading) return <div>Loading!!!</div>;

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>

      {isSuccess && <OrdersView orders={data.orders} count={data.count} />}
    </>
  );
}
