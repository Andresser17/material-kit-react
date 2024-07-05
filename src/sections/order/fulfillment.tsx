import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";

import { FulfillmentStatus } from "src/enums";

import { Order, ShippingMethodData } from "@medusajs/types";
import Iconify from "src/components/iconify";
import Label from "src/components/label";
import SectionBox from "src/components/section-box";

interface IFulfillment {
  order: Order;
  status: FulfillmentStatus;
}

export default function Fulfillment({ order, status }: IFulfillment) {
  const theme = useTheme();
  const fulfillmentData = order.shipping_methods.map((method) => {
    const data: ShippingMethodData = method.data;

    return (
      <Box key={method.id}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          First Name: {data.first_name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Last Name: {data.last_name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Phone: {data.phone}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Document: {data.document}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Destination Agency: {data.destination_agency}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Destination City: {data.destination_city}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Destination State: {data.destination_state}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Shipping Option ID: {data.shipping_option_id}
        </Typography>
      </Box>
    );
  });

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Fulfillment</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Label
            color={status === FulfillmentStatus.SHIPPED ? "success" : "error"}
            sx={{ mr: FulfillmentStatus.SHIPPED ? 0 : 1 }}
          >
            {status}
          </Label>
          {status === FulfillmentStatus.NOT_FULFILLED && (
            <Button>Create Fulfillment</Button>
          )}
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
        Shipping Method
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {order.shipping_methods &&
          order.shipping_methods.map((method) => {
            return method.shipping_option.data.name;
          })}
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <Iconify icon="ep:arrow-down-bold" sx={{ width: 16, height: 16 }} />
          }
          sx={{
            boxShadow: theme.shadows[1],
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography variant="body2" sx={{ color: "#888" }}>
            {`{...}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            boxShadow: theme.customShadows.card,
            borderColor: theme.palette.background.default,
          }}
        >
          {fulfillmentData}
        </AccordionDetails>
      </Accordion>
      <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
        Fulfillment #1 Fulfilled by Manual
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Typography variant="body2" sx={{ mr: 1, color: "#888" }}>
          Tracking
        </Typography>
        <Typography variant="body2" sx={{ color: "primary.main" }}>
          #0000000
        </Typography>
      </Box>
    </SectionBox>
  );
}
