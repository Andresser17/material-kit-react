import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

// ----------------------------------------------------------------------

interface IProductTableHead {
  headLabel: Array<{
    id: string;
    label: string;
  }>;
}

export default function ItemsTableHead({ headLabel }: IProductTableHead) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((cell) => (
          <TableCell
            key={cell.id}
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              p: 1,
            }}
          >
            <TableSortLabel hideSortIcon>{cell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
