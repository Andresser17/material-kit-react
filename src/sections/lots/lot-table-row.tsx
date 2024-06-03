import { Lot } from "@medusajs/types";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import LotStatusLabel from "src/components/lot-status-label";

// ----------------------------------------------------------------------

interface ILotTableRow {
  lot: Lot;
  selectedRow: boolean;
}

export default function LotTableRow({ lot, selectedRow }: ILotTableRow) {
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={() => navigate(`/lots/${lot.id}`)}
      tabIndex={-1}
      role="checkbox"
      selected={selectedRow}
      sx={{ textDecoration: "none", cursor: "pointer" }}
    >
      <TableCell sx={{ pl: 2 }} component="th" scope="row" padding="none">
        <Typography
          sx={{ fontSize: 10, color: "#888" }}
          variant="subtitle2"
          noWrap
        >
          #{lot.id.split("").slice(5)}
        </Typography>
      </TableCell>

      <TableCell align="center">{lot.created_at?.toString()}</TableCell>

      <TableCell align="center">{lot.name}</TableCell>

      <TableCell>{lot.courier?.company}</TableCell>

      <TableCell>{lot.cost?.amount}</TableCell>

      <TableCell>
        <LotStatusLabel status={lot.status} />
      </TableCell>
    </TableRow>
  );
}
