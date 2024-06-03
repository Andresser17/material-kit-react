import { Lot } from "@medusajs/types";

import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";

import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";
import LotStatusLabel from "src/components/lot-status-label/LotStatusLabel";

interface ILotDetails {
  lot: Lot;
}

export default function LotDetails({ lot }: ILotDetails) {
  const costAmount =
    (lot.cost?.amount ?? 0) +
    (lot.cost?.payment.fee.amount ?? 0) +
    (lot.courier?.cost.amount ?? 0);

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {lot.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#888" }}>
            {lot.description}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LotStatusLabel status={lot.status} />
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Box sx={{ display: "flex" }}>
        <TitleValueField
          title="Cost"
          value={`${costAmount} ${lot.cost?.currency}` ?? "N/A"}
        />
        <TitleValueField
          title="Courier"
          value={lot.courier?.company ?? "N/A"}
        />
        <TitleValueField
          title="Items"
          value={lot.items?.quantity.toString() ?? "N/A"}
        />
      </Box>
    </SectionBox>
  );
}
