import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Iconify from "../iconify";
import ItemsTable from "./items-table";

export default function Header() {
  return (
    <>
      {/* Items */}
      <ItemsTable />

      {/* Warranty */}
      <Box sx={{ mt: 2, mb: 12 }}>
        <Typography variant="h6">Garantía:</Typography>
        <Typography variant="body1" sx={{ fontSize: "12px", mb: 2 }}>
          30 días de garantía contra defecto de fábrica.
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "12px", lineHeight: 0.8, fontWeight: "bold" }}
        >
          Esta garantía no es válida en los siguientes casos:
        </Typography>
        <List sx={{ p: 0 }}>
          <ListItem sx={{ fontSize: "14px", pb: 0 }}>
            <ListItemIcon>
              <Iconify
                icon="tabler:point-filled"
                sx={{ color: "#000", width: "12px", height: "12px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Daños por sobretensión eléctrica."
              sx={{ "& .MuiListItemText-primary": { fontSize: "12px" } }}
            />
          </ListItem>
          <ListItem sx={{ fontSize: "14px", pb: 0 }}>
            <ListItemIcon>
              <Iconify
                icon="tabler:point-filled"
                sx={{ color: "#000", width: "12px", height: "12px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Daños por agua."
              sx={{ "& .MuiListItemText-primary": { fontSize: "12px" } }}
            />
          </ListItem>
          <ListItem sx={{ fontSize: "14px", pb: 0 }}>
            <ListItemIcon sx={{ mr: 0 }}>
              <Iconify
                icon="tabler:point-filled"
                sx={{ color: "#000", width: "12px", height: "12px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Daños por caídas o golpes."
              sx={{ "& .MuiListItemText-primary": { fontSize: "12px" } }}
            />
          </ListItem>
          <ListItem sx={{ fontSize: "14px", pb: 0 }}>
            <ListItemIcon>
              <Iconify
                icon="tabler:point-filled"
                sx={{ color: "#000", width: "12px", height: "12px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Mal manejo del equipo."
              sx={{ "& .MuiListItemText-primary": { fontSize: "12px" } }}
            />
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
    </>
  );
}
