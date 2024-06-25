import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetDraftOrder } from "src/queries/use-get-draft-order";

import { DraftOrderView } from "src/sections/draft-order/view";

// ----------------------------------------------------------------------

export default function DraftOrderPage() {
  const { id } = useParams();
  const { data: draftOrder, isLoading } = useGetDraftOrder({
    draft_order_id: id ?? "",
  });

  if (isLoading && !draftOrder) return <div>Loading!!!</div>;

  return (
    <div>
      <Helmet>
        <title>Draft Order Details</title>
      </Helmet>

      {draftOrder && <DraftOrderView draftOrder={draftOrder} />}
    </div>
  );
}
