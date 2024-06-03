import { Helmet } from "react-helmet-async";

import { LotView } from "src/sections/lot/view";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Lot Details</title>
      </Helmet>

      <LotView />
    </>
  );
}
