import {
  Box,
  Card,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import { FulfillmentStatus } from "src/enums";

import Label from "src/components/label";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";

interface IFulfillment {
  status: FulfillmentStatus;
}

export default function Fulfillment({ status }: IFulfillment) {
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
        Pickup in Person
      </Typography>
      <Card
        sx={{
          backgroundColor: "background.neutral",
          p: 2,
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="body2" sx={{ color: "#888" }}>
              {`{...}`}
            </Typography>
            <Typography variant="body2" sx={{ ml: 1, color: "#888" }}>
              (12 items)
            </Typography>
          </Box>

          <IconButton sx={{ borderRadius: "5px" }}>
            <Iconify icon="ep:arrow-down-bold" sx={{ width: 16, height: 16 }} />
          </IconButton>
        </Box>
      </Card>
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
