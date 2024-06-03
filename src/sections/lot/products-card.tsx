import { Lot } from "@medusajs/types";

import { Divider, Typography } from "@mui/material";

import SectionBox from "src/components/section-box";

import ItemsTable from "./items-table/items-table";

interface IProductsCard {
  lot: Lot;
}

export default function ProductsCard({ lot }: IProductsCard) {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Typography variant="h4">Products</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <ItemsTable lot={lot} />
    </SectionBox>
  );
}
