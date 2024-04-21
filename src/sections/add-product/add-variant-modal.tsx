import {
  Switch,
  Divider,
  useTheme,
  MenuItem,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import {
  Box,
  Modal,
  Button,
  TextField,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import { grey } from "src/theme/palette";

import Iconify from "src/components/iconify";

export default function AddVariantModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const theme = useTheme();
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          maxWidth: 750,
          backgroundColor: theme.palette.background.default,
          p: 3,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Add Variant</Typography>
          <IconButton id="section-op" onClick={handleClose}>
            <Iconify icon="eva:close-fill" width={25} />
          </IconButton>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
        <VariantAccordion />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            color="success"
            size="medium"
            sx={{ mr: 2 }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            variant="text"
            size="small"
            color="error"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}


function VariantAccordion() {
  const countries = [{ value: "china", label: "China" }];

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<Iconify icon="eva:minus-fill" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          General *
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              id="custom-title"
              label="Custom title"
              variant="outlined"
              sx={{ width: "48%" }}
            />
          </Box>
          <Typography variant="subtitle2" sx={{ my: 2 }}>
            Options
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              id="title"
              label="Option title"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mr: 2 }}
            />
            <IconButton
              aria-label="Delete option"
              size="small"
              sx={{ borderRadius: 1, border: `1px solid ${grey[700]}` }}
            >
              <Iconify
                icon="eva:trash-2-outline"
                width={28}
                sx={{ p: "3px" }}
              />
            </IconButton>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<Iconify icon="eva:minus-fill" />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Stock & Inventory
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              id="sku"
              label="Stock keeping unit (SKU)"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <TextField
              id="stock"
              type="number"
              label="Stock"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <TextField
              id="ean"
              label="EAN (Barcode)"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <TextField
              id="upc"
              label="UPC (Barcode)"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <TextField
              id="barcode"
              label="Barcode"
              variant="outlined"
              sx={{ width: "48%" }}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1">Manage inventory</Typography>
            <FormControlLabel
              control={
                <Switch
                  id="manage-inventory"
                  aria-label="Manage inventory"
                  defaultChecked
                />
              }
              label="When checked Medusa will regulate the inventory when orders and returns are made"
              labelPlacement="start"
              slotProps={{
                typography: {
                  fontSize: 12,
                },
              }}
              sx={{ display: "flex", justifyContent: "space-between", m: 0 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1">Allow backorders</Typography>
            <FormControlLabel
              control={
                <Switch id="allow-backorders" aria-label="Allow backorders" />
              }
              label="When checked the product will be available for purchase despite being sold out"
              labelPlacement="start"
              slotProps={{
                typography: {
                  fontSize: 12,
                },
              }}
              sx={{ display: "flex", justifyContent: "space-between", m: 0 }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<Iconify icon="eva:minus-fill" />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <div>
            <Typography variant="subtitle1">Shipping</Typography>
            <Typography
              variant="subtitle2"
              sx={{ mt: 1, fontSize: 12, color: grey[600] }}
            >
              Shipping information can be required depending on your shipping
              provider, and whether or not you are shipping internationally
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">Dimensions</Typography>
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, mb: 2, fontSize: 12, color: grey[600] }}
          >
            Configure to calculate the most accurate shipping rates.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <TextField
              id="width"
              type="number"
              label="Width"
              variant="outlined"
              sx={{ width: "23%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
            />
            <TextField
              id="length"
              type="number"
              label="Length"
              variant="outlined"
              sx={{ width: "23%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
            />
            <TextField
              id="height"
              type="number"
              label="Height"
              variant="outlined"
              sx={{ width: "23%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
            />
            <TextField
              id="weight"
              type="number"
              label="Weight"
              variant="outlined"
              sx={{ width: "23%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              }}
            />
          </Box>
          <Typography variant="subtitle2">Customs</Typography>
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, mb: 2, fontSize: 12, color: grey[600] }}
          >
            Configure if you are shipping internationally.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <TextField
              id="mid-code"
              label="MID Code"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <TextField
              id="hs-code"
              label="HS Code"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <TextField
              select
              defaultValue="China"
              id="country-of-origin"
              label="Country of origin"
              variant="outlined"
              required
              sx={{ width: "48%", mt: 1 }}
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<Iconify icon="eva:minus-fill" />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          Metadata
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </>
  );
}
