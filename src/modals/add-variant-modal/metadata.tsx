import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import Iconify from "src/components/iconify";

export default function Metadata() {
  return (
    <Box>
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
    </Box>
  );
}
