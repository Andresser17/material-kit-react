import { Helmet } from "react-helmet-async";

import { DraftOrdersView } from "src/sections/draft-orders/view";

// ----------------------------------------------------------------------

export default function DraftOrderPage() {
  return (
    <>
      <Helmet>
        <title>Order Details</title>
      </Helmet>

      <DraftOrdersView />
    </>
  );
}
