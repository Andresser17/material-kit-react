import { Helmet } from "react-helmet-async";
import { useListCustomers } from "src/queries/use-list-customers";

import CustomersView from "src/sections/customers/view";

// ----------------------------------------------------------------------

export default function CustomersPage() {
  const { data: customers, isLoading } = useListCustomers();

  if (isLoading && !customers) return <div>Loading!!!</div>;

  return (
    <div>
      <Helmet>
        <title>Customers</title>
      </Helmet>

      {customers && (
        <CustomersView
          customers={customers.customers}
          count={customers.count}
        />
      )}
    </div>
  );
}
