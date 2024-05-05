import { Box, Avatar, Divider, Typography } from "@mui/material";

import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";

export default function Summary() {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Typography variant="h4">Summary</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            // alt={data.thumbnail as string}
            // src={data.thumbnail as string}
            src="string"
            variant="square"
            sx={{ width: 24, height: 24, mr: 2 }}
          />
          <Typography sx={{ fontSize: 12 }} variant="subtitle2" noWrap>
            CPU
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{ fontSize: 12, color: "#888", mr: 2 }}
            variant="subtitle2"
            noWrap
          >
            $10.00 x5
          </Typography>
          <Typography sx={{ fontSize: 12, mr: 0.8 }} variant="subtitle2" noWrap>
            $50.00
          </Typography>
          <Typography
            sx={{ fontSize: 12, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            USD
          </Typography>
        </Box>
      </Box>
      <SummaryField
        title="Subtotal"
        value="$50.00 USD"
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Shipping"
        value="$0.00 USD"
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Tax"
        value="$0.00 USD"
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField title="Total to pay" value="$50.00" bold />
    </SectionBox>
  );
}
