import { Order, Warranty } from "@medusajs/types";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import { formatToLocalTimeEs } from "src/utils/format-time";
import Content from "./content";
import Header from "./header";

interface IInvoice {
  order: Order;
  warranties: Warranty[];
}

export const Invoice = React.forwardRef<HTMLDivElement, IInvoice>(
  (props, ref) => {
    const { order, warranties } = props;

    return (
      <Box
        ref={ref}
        component="div"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          position: "relative",
          width: "21.6cm",
          height: "27.9cm",
          p: "15mm 22.5mm 15mm 22.5mm",
        }}
      >
        {/* Header */}
        <Box>
          <Header
            invoiceNumber={order.display_id}
            customer={order.customer}
            shippingAddress={order.shipping_address}
            orderDate={formatToLocalTimeEs(order.created_at)}
          />
        </Box>

        {/* Content */}
        <Box>
          <Content items={order.items} warranties={warranties} />
        </Box>

        {/* Footer */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            left: 0,
            bottom: "15mm",
          }}
        >
          {/* Direccion Fiscal */}
          <Typography variant="body2" align="center" sx={{ fontSize: "10px" }}>
            Calle 26 antigua Calle Esperanza Casa # 9, Sector Viento Colao.
            Maturín, Estado Monagas. Zona Postal 6201.
          </Typography>
        </Box>
      </Box>
    );
  },
);
