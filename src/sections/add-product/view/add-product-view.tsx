import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import Variants from "../variants";
import AddImages from "../add-images";
import Attributes from "../attributes";
import RawProduct from "../raw-product";
import GeneralInfo from "../general-info";
 
// ----------------------------------------------------------------------

export default function AddProductView() {
  const floatingButtons = (
    <Box sx={{ position: "fixed", bottom: 10, right: 5, zIndex: 99 }}>
      <Button variant="contained" color="success" size="large" sx={{ mr: 2 }}>
        Save
      </Button>
      <Button variant="text" color="error">
        Cancel
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", gap: 3, p: 2 }}>
      <Box sx={{ w: "60%" }}>
        <GeneralInfo />
        <Variants />
        <Attributes />
        <RawProduct />
        {floatingButtons}
      </Box>
      <Box sx={{ width: "40%" }}>
        <AddImages />
      </Box>
    </Box>
  );
}
