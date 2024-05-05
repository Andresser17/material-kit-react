import { Helmet } from "react-helmet-async";

import { DraftOrderView } from "src/sections/draft-order/view";

// ----------------------------------------------------------------------

export default function DraftOrderPage() {
  return (
    <>
      <Helmet>
        <title>Draft Order Details</title>
      </Helmet>

      <DraftOrderView />
    </>
  );
}
