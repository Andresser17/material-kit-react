import { Helmet } from "react-helmet-async";

import { LotsView } from "src/sections/lots/view";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Lots</title>
      </Helmet>

      <LotsView />
    </>
  );
}
