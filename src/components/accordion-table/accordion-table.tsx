import { ReactNode, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SxProps,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";

import Iconify from "../iconify";

// ----------------------------------------------------------------------

export interface IAccordionTable {
  head: ReactNode;
  children: ReactNode;
  sx: SxProps;
}

export default function AccordionTable({
  head,
  children,
  sx,
}: IAccordionTable) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      sx={{
        "& .MuiAccordionSummary-root:hover:not(.Mui-disabled)": {
          cursor: "default",
        },
        ...sx,
      }}
      expanded={expanded}
    >
      <AccordionSummary
        expandIcon={
          <Iconify
            icon="ep:arrow-down-bold"
            sx={{
              width: "28px",
              height: "28px",
              cursor: "pointer",
              padding: "5px",
              "&:hover": {
                backgroundColor: "action.hover",
                borderRadius: "100%",
              },
            }}
            onClick={() => setExpanded((prev) => !prev)}
          />
        }
        // aria-controls={`${product.id}-content`}
        // id={`${product.id}-header`}
      >
        <TableContainer sx={{ overflow: "unset" }}>
          <Table>
            <TableHead>{head}</TableHead>
          </Table>
        </TableContainer>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer sx={{ overflow: "unset" }}>
          <Table>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
