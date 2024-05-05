import { Helmet } from "react-helmet-async";

import { CreateDraftOrderView } from "src/sections/create-draft-order/view";

// ----------------------------------------------------------------------

export default function CreateDraftOrderPage() {
  return (
    <>
      <Helmet>
        <title>Create Draft Order</title>
      </Helmet>

      <CreateDraftOrderView />
    </>
  );
}
