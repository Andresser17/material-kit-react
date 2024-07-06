import { Address, Customer } from "@medusajs/types";
import { Box, Typography } from "@mui/material";

interface IHeader {
  invoiceNumber: number;
  customer: Customer;
  shippingAddress: Address;
  orderDate: string;
}

export default function Header({
  invoiceNumber,
  customer,
  shippingAddress,
  orderDate,
}: IHeader) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ lineHeight: 0.9 }}>
            AR MOTORS, C.A.
          </Typography>
          <Typography variant="subtitle2">
            Multiservicios y Construcciones
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: "normal" }}>
            TELF: 0291-6425112
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: "normal" }}>
            RIF: J-40198649-8
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "normal" }}>
            NOTA DE ENTREGA
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "normal" }}>
            N.º {invoiceNumber}
          </Typography>
        </Box>
      </Box>

      {/* Client data */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            <strong>Cliente:</strong> {customer.first_name} {customer.last_name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            <strong>Dirección:</strong> {shippingAddress.address_1}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            <strong>Cedula o RIF:</strong> {customer.document}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            <strong>Teléfono:</strong> {shippingAddress.phone}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            {orderDate}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
