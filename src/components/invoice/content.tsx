import { LineItem, Warranty } from "@medusajs/types";
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

interface IHeader {
  items: LineItem[];
  warranties: Warranty[];
}

export default function Header({ items, warranties }: IHeader) {
  const warranty_time = warranties.reduce((prev, current) => {
    if (current.time > prev) return current.time;
    return prev;
  }, 0);

  return (
    <>
      {/* Items */}
      <ItemsTable items={items} />

      {/* Warranty */}
      <Box sx={{ mt: 2, mb: 12 }}>
        <Typography variant="h6">Garantía:</Typography>
        <Typography variant="body1" sx={{ fontSize: "12px", mb: 2 }}>
          {warranty_time} días de garantía contra defecto de fábrica.
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
        sx={{
          width: "100%",
          p: "22.5mm",
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          left: 0,
          bottom: "25mm",
        }}
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
