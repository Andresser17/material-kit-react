import { Lot } from "@medusajs/types";

import { Box, Divider, Typography } from "@mui/material";

import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";

interface ISummary {
  lot: Lot;
}

export default function Summary({ lot }: ISummary) {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Summary</Typography>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Box>
        <Typography variant="subtitle2" sx={{ mb: "3px" }}>
          Cost
        </Typography>
        <SummaryField
          title="Amount"
          value={`${lot.cost?.amount.toString() ?? ""} ${lot.cost?.currency}`}
          sx={{ color: "#888", fontSize: 14 }}
        />
        <SummaryField
          title="Fee"
          value={`${lot.cost?.payment.fee.amount.toString() ?? ""} ${lot.cost?.currency}`}
          sx={{ color: "#888", fontSize: 14 }}
        />
        <SummaryField
          title="Method"
          value={lot.cost?.payment.method ?? ""}
          sx={{ color: "#888", fontSize: 14 }}
        />
        <Typography variant="subtitle2" sx={{ mb: "3px" }}>
          Courier
        </Typography>
        <SummaryField
          title="Company"
          value={lot.courier?.company ?? ""}
          sx={{ color: "#888", fontSize: 14 }}
        />
        <SummaryField
          title="Weight"
          value={`${lot.courier?.weight.amount ?? ""} ${lot.courier?.weight.unit ?? ""}`}
          sx={{ color: "#888", fontSize: 14 }}
        />
        <SummaryField
          title="Cost"
          value={`${lot.courier?.cost.amount ?? ""} ${lot.courier?.cost.currency ?? ""}`}
          sx={{ color: "#888", fontSize: 14 }}
        />
        <SummaryField
          title="Payment"
          value={lot.courier?.payment.method ?? ""}
          sx={{ color: "#888", fontSize: 14 }}
        />
        <SummaryField
          title="Payment Fee"
          value={`${lot.courier?.payment.fee.amount ?? ""} ${lot.courier?.payment.fee.currency ?? ""}`}
          sx={{ color: "#888", fontSize: 14 }}
        />
        <Typography variant="subtitle2" sx={{ mb: "3px" }}>
          Ownership
        </Typography>
        {lot.ownership &&
          lot.ownership.map((owner) => (
            <SummaryField
              key={owner.investment.amount}
              title={owner.name ?? ""}
              value={`${owner.investment.amount.toString()} ${owner.investment.currency}`}
              sx={{ color: "#888", fontSize: 14 }}
            />
          ))}
      </Box>
    </SectionBox>
  );
}
