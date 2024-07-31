import { Helmet } from "react-helmet-async";
import { useListCustomers } from "src/queries/use-list-customers";
import { useListRegions } from "src/queries/use-list-regions";

import { CreateDraftOrderView } from "src/sections/create-draft-order/view";

// ----------------------------------------------------------------------

export default function CreateDraftOrderPage() {
  const { data: customers, isLoading } = useListCustomers();
  const { data: regions, isLoading: isLoadingRegions } = useListRegions();

  if ((isLoading && !customers) || (isLoadingRegions && !regions))
    return <div>Loading!!!</div>;

  return (
    <>
      <Helmet>
        <title>Create Draft Order</title>
      </Helmet>

      {customers && regions && (
        <CreateDraftOrderView customers={customers} regions={regions} />
      )}
    </>
  );
}
