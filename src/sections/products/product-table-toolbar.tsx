import { useEffect, SetStateAction } from "react";

import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import { useModal } from "src/modals/useModal";
import { useAppSelector } from "src/redux/hooks";
import { getCallAction } from "src/redux/slices/confirm-action";
import { useDeleteProduct } from "src/mutations/use-delete-product";
import { IConfirmActionModal } from "src/modals/confirm-action-modal";

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
  const { onOpen: openModal } = useModal<IConfirmActionModal>(
    "confirm-action-modal",
  );
  const callAction = useAppSelector((state) => getCallAction(state));
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
