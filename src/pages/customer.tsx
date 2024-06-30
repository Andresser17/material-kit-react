import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetCustomer } from "src/queries/use-get-customer";
import { useListOrders } from "src/queries/use-list-orders";
import CustomerView from "src/sections/customer/view";

// ----------------------------------------------------------------------

export default function CustomersPage() {
  const { id } = useParams();
  const { data: customer, isLoading } = useGetCustomer(id ?? "");
  const { data: orders, isLoading: isLoadingOrders } = useListOrders({
    query: {
      customer_id: id ?? "",
    },
  });

  if (isLoading || isLoadingOrders) return <div>Loading!!!</div>;

  console.log({ customer, orders });

  return (
    <div>
      <Helmet>
        <title>Customer</title>
      </Helmet>

      {customer && orders && (
        <CustomerView customer={customer} orders={orders} />
      )}
    </div>
  );
}
