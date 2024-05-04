import { Helmet } from "react-helmet-async";

import { OrdersView } from "src/sections/orders/view";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>

      <OrdersView />
    </>
  );
}
