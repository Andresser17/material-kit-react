import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ lineHeight: 0.9 }}>
            AR MOTORS, C.A.
          </Typography>
          <Typography variant="subtitle2">
            Multiservicios y Construcciones
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: "normal" }}>
            TELF: 0291-6425112
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: "normal" }}>
            RIF: J-40198649-8
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "normal" }}>
            NOTA DE ENTREGA
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "normal" }}>
            N.º 252
          </Typography>
        </Box>
      </Box>

      {/* Client data */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            <strong>Cliente:</strong> Alejandro
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            <strong>Dirección:</strong> Sector Giraldot
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            <strong>Cedula o RIF:</strong> V 12345678
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            <strong>Teléfono:</strong> 04248599379
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontSize: "12px" }}>
            05 de julio de 2024
          </Typography>
        </Box>
      </Box>
    </>
  );
}
