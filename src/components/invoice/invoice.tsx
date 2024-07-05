import { Box, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import Iconify from "../iconify";
import ItemsTable from "./items-table";

export default function Invoice() {
  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
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
          <Typography variant="h4" sx={{ fontWeight: "normal" }}>
            NOTA DE ENTREGA
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "normal" }}>
            N.º 252
          </Typography>
        </Box>
      </Box>

      {/* Client data */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}>
        <Box>
          <Typography variant="body1">
            <strong>Cliente:</strong> Alejandro
          </Typography>
          <Typography variant="body1">
            <strong>Dirección:</strong> Sector Giraldot
          </Typography>
          <Typography variant="body1">
            <strong>Cedula o RIF:</strong> V 12345678
          </Typography>
          <Typography variant="body1">
            <strong>Teléfono:</strong> 04248599379
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">05 de julio de 2024</Typography>
        </Box>
      </Box>

      {/* Items */}
      <ItemsTable />

      {/* Warranty */}
      <Box sx={{ mt: 12, mb: 12 }}>
        <Typography variant="h5">Garantía:</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          30 días de garantía contra defecto de fábrica.
        </Typography>
        <Typography
          variant="body2"
          sx={{ lineHeight: 0.8, fontWeight: "bold" }}
        >
          Esta garantía no es válida en los siguientes casos:
        </Typography>
        <List sx={{ p: 0 }}>
          <ListItem sx={{ fontSize: "14px", pb: 0 }}>
            <ListItemIcon>
              <Iconify icon="tabler:point-filled" />
            </ListItemIcon>
            Daños por sobretensión eléctrica.
          </ListItem>
          <ListItem sx={{ fontSize: "14px", pb: 0 }}>
            <ListItemIcon>
              <Iconify icon="tabler:point-filled" />
            </ListItemIcon>
            Daños por agua.
          </ListItem>
          <ListItem sx={{ fontSize: "14px", pb: 0 }}>
            <ListItemIcon>
              <Iconify icon="tabler:point-filled" />
            </ListItemIcon>
            Daños por caídas o golpes.
          </ListItem>
          <ListItem sx={{ fontSize: "14px", pb: 0 }}>
            <ListItemIcon>
              <Iconify icon="tabler:point-filled" />
            </ListItemIcon>
            Mal manejo del equipo.
          </ListItem>
        </List>
      </Box>

      {/* Firmas */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", px: 4, mb: 6 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
          }}
        >
          <Box sx={{ width: "100%", borderBottom: "2px solid black" }}></Box>
          <Typography variant="body2">Firma Vendedor</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
          }}
        >
          <Box sx={{ width: "100%", borderBottom: "2px solid black" }}></Box>
          <Typography variant="body2">Firma Comprador</Typography>
        </Box>
      </Box>

      {/* Direccion Fiscal */}
      <Typography variant="body2" align="center" sx={{ fontSize: "10px" }}>
        Calle 26 antigua Calle Esperanza Casa # 9, Sector Viento Colao. Maturín,
        Estado Monagas. Zona Postal 6201.
      </Typography>
    </Box>
  );
}
