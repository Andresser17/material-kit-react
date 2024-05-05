import { Helmet } from "react-helmet-async";

import { OrderView } from "src/sections/order/view";

// ----------------------------------------------------------------------

export default function DraftOrderPage() {
  return (
    <>
      <Helmet>
        <title>Order Details</title>
      </Helmet>

      <OrderView />
    </>
  );
}
