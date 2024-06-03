import { ReactNode } from "react";

import {
  Table,
  Accordion,
  TableHead,
  TableBody,
  TableContainer,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import Iconify from "../iconify";

// ----------------------------------------------------------------------

export interface IAccordionTable {
  head: ReactNode;
  children: ReactNode;
}

export default function AccordionTable({ head, children }: IAccordionTable) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<Iconify icon="ep:arrow-down-bold" />}
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
