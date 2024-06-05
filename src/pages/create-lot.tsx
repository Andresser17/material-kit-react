import { Helmet } from "react-helmet-async";

import { CreateLot } from "src/sections/create-lot/view";

// ----------------------------------------------------------------------

export default function CreateDraftOrderPage() {
  return (
    <>
      <Helmet>
        <title>Create Lot</title>
      </Helmet>

      <CreateLot />
    </>
  );
}
