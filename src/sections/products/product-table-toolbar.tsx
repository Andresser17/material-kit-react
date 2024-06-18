import { SetStateAction, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { IConfirmActionModal } from "src/modals/confirm-action-modal";
import { useModal } from "src/modals/useModal";
import { useDeleteProduct } from "src/mutations/use-delete-product";

import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

interface IProductTableToolbar {
  selected: Array<string>;
  setSelected: (products: Array<string>) => void;
  filterName: string;
  onFilterName: (event: { target: { value: SetStateAction<string> } }) => void;
}

export default function ProductTableToolbar({
  selected,
  setSelected,
  filterName,
  onFilterName,
}: IProductTableToolbar) {
  const {
    props: { callAction },
    onOpen: openModal,
  } = useModal<IConfirmActionModal>("confirm-action-modal");
  const deleteProductMutation = useDeleteProduct();

  const handleDelete = () => {
    selected.forEach((id) => deleteProductMutation({ id }));
    setSelected([]);
  };

  useEffect(() => {
    if (callAction) {
      handleDelete();
    }
  }, [callAction]);

  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(selected.length > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {selected.length} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {selected.length > 0 ? (
        <Tooltip
          title="Delete"
          onClick={() =>
            openModal({
              title: `Confirm Product Delete`,
              message: `Are you sure you want to delete ${selected.length} selected ${selected.length > 1 ? "products" : "product"}?`,
            })
          }
        >
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
