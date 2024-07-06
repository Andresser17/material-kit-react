import { Box, Typography } from "@mui/material";
import * as React from "react";
import Content from "./content";
import Header from "./header";

export const Invoice = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box
      ref={ref}
      component="div"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        position: "relative",
        width: "21.6cm",
        height: "27.9cm",
        p: "15mm 22.5mm 15mm 22.5mm",
      }}
    >
      {/* Header */}
      <Box>
        <Header />
      </Box>

      <Box>
        <Content />
      </Box>

      <Box
        sx={{
          width: "100%",
          position: "absolute",
          left: 0,
          bottom: "15mm",
        }}
      >
        {/* Direccion Fiscal */}
        <Typography variant="body2" align="center" sx={{ fontSize: "10px" }}>
          Calle 26 antigua Calle Esperanza Casa # 9, Sector Viento Colao.
          Maturín, Estado Monagas. Zona Postal 6201.
        </Typography>
      </Box>
    </Box>
  );
});
