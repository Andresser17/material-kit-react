import { memo } from "react";
import { createPortal } from "react-dom";

import {
  Box,
  Modal,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import Iconify from "src/components/iconify";

export interface IBaseModal {
  modalId: string;
  open: boolean;
  title: string;
  children: string | React.ReactNode;
  footer?: string | React.ReactNode;
  closeOnTap?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

const BaseModal = memo((props: IBaseModal) => {
  const {
    modalId,
    open,
    title,
    footer,
    closeOnTap,
    onClose,
    onSubmit,
    children,
  } = props;

  const root = document.getElementById("root");

  if (!root) throw new Error("Root node not found. Cannot render modal.");

  const handleInsideClick: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    if (!closeOnTap) {
      event.stopPropagation();
    }
  };

  return createPortal(
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
      onClose={onClose}
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        className="modal-panel"
        onClick={handleInsideClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: {
            xs: "100%",
          },
          maxWidth: "660px",
          minHeight: 250,
          backgroundColor: "background.default",
          p: 3,
          borderRadius: 1,
          overflowY: "auto",
        }}
      >
        <Box className="modal-header">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">{title}</Typography>
            <IconButton id="section-op" onClick={onClose}>
              <Iconify icon="eva:close-fill" width={25} />
            </IconButton>
          </Box>
          <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
        </Box>

        <div className="modal-content">{children}</div>
        <Box
          className="modal-footer"
          sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
        >
          {footer ? (
            footer
          ) : (
            <>
              <Button
                form={modalId}
                type="submit"
                variant="contained"
                color="success"
                size="medium"
                sx={{ mr: 2 }}
                onClick={onSubmit}
              >
                Save
              </Button>
              <Button
                onClick={onClose}
                variant="text"
                size="small"
                color="error"
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Modal>,
    root,
  );
});

export default BaseModal;