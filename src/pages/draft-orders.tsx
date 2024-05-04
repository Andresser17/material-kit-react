import { Helmet } from "react-helmet-async";

import { DraftOrdersView } from "src/sections/draft-orders/view";

// ----------------------------------------------------------------------

export default function DraftOrdersPage() {
  return (
    <>
      <Helmet>
        <title>Draft Orders</title>
      </Helmet>

      <DraftOrdersView />
    </>
  );
}
