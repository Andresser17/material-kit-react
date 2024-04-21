import { Helmet } from "react-helmet-async";

import { ErrorView } from "src/sections/error";

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found </title>
      </Helmet>

      <ErrorView />
    </>
  );
}
