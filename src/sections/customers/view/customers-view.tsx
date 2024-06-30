import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";

import { IAddProductModal } from "src/modals/add-product-modal";
import { useModal } from "src/modals/useModal";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";

import { CustomerDTO } from "@medusajs/types";
import { emptyRows } from "src/utils/table-utils";
import CustomerTableRow from "../customer-table-row";
import ProductTableHead, { TableOrder } from "../product-table-head";
import ProductTableToolbar from "../product-table-toolbar";
import TableEmptyRows from "../table-empty-rows";

// ----------------------------------------------------------------------

interface ICustomersView {
  customers: CustomerDTO[];
  count: number;
}

export default function CustomersView({ customers, count }: ICustomersView) {
  const {
    props: { redirect_url },
    onOpen: openModal,
    onUpdate: updateModal,
  } = useModal<IAddProductModal>("add-product-modal");

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<TableOrder>(TableOrder.ASC);

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const handleSort = (_event: unknown, id: SetStateAction<string>) => {
    const isAsc = orderBy === id && order === TableOrder.ASC;
    if (id !== "") {
      setOrder(isAsc ? TableOrder.DESC : TableOrder.ASC);
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event: { target: { checked: unknown } }) => {
    if (event.target.checked) {
      const newSelecteds = customers.map((customer) => customer.id);
      if (newSelecteds) setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] | ((prevState: never[]) => never[]) = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handlePageChange = (
    _event: unknown,
    newPage: SetStateAction<number>,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // redirect to product view after created a new one
  useEffect(() => {
    if (redirect_url) {
      navigate(`/products/${redirect_url}`);
      updateModal({ redirect_url: "" });
    }
  }, [redirect_url]);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Customers</Typography>

        <Button
          onClick={() => openModal()}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Customer
        </Button>
      </Stack>

      <Card>
        <ProductTableToolbar
          selected={selected}
          setSelected={setSelected}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar sx={null}>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <ProductTableHead
                order={order}
                orderBy={orderBy}
                rowCount={count}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "thumbnail", label: "Thumbnail", align: "center" },
                  { id: "email", label: "Email" },
                  { id: "name", label: "Name", align: "center" },
                  { id: "has_account", label: "Has Account?", align: "center" },
                  { id: "options", label: "" },
                ]}
              />
              <TableBody>
                {customers &&
                  customers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((customer) => (
                      <CustomerTableRow
                        key={customer.id}
                        customer={customer}
                        selectedRow={selected.indexOf(customer.id) !== -1}
                        handleClick={() => {
                          return handleClick(customer.id);
                        }}
                      />
                    ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, count)}
                />

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
