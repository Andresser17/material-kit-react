import { Table, TableBody, TableContainer } from "@mui/material";

import Scrollbar from "src/components/scrollbar";

import { Warranty } from "@medusajs/types";
import WarrantiesTableHead from "./warranties-table-head";
import WarrantiesTableRow from "./warranties-table-row";

interface IWarrantiesTable {
  warranties: Warranty[];
}

export default function WarrantiesTable({ warranties }: IWarrantiesTable) {
  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ overflow: "unset" }}>
          <Table>
            <WarrantiesTableHead
              headLabel={[
                { id: "product", label: "Product" },
                { id: "avatar", label: "" },
                { id: "total_time", label: "Total Time" },
                {
                  id: "expiration_date",
                  label: "Expiration Date",
                  align: "center",
                },
                { id: "options", label: "" },
              ]}
            />
            <TableBody>
              {warranties &&
                warranties.map((warranty) => {
                  return (
                    <WarrantiesTableRow key={warranty.id} warranty={warranty} />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </>
  );
}
