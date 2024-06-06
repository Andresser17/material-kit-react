import { Box, Button, Typography } from "@mui/material";

import { useAppDispatch } from "src/redux/hooks";
import { setCallAction } from "src/redux/slices/confirm-action";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface IConfirmActionModal {
  title: string;
  message: string;
}

export default function ConfirmActionModal() {
  const {
    props: { title, message },
    onClose: closeModal,
  } = useModal<IConfirmActionModal>("confirm-action-modal");
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(setCallAction(true));
    closeModal();
  };

  const footerSection = (
    <Box className="footer-section">
      <Button
        type="submit"
        variant="contained"
        color="success"
        size="medium"
        sx={{ mr: 2 }}
        onClick={handleSave}
      >
        Confirm
      </Button>
      <Button variant="text" color="error" onClick={closeModal}>
        Cancel
      </Button>
    </Box>
  );

  return (
    <BaseModal
      modalId="confirm-action-modal"
      title={title}
      open
      closeOnTap
      onClose={closeModal}
      onSubmit={handleSave}
      footer={footerSection}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "normal", fontSize: 16 }}
      >
        {message}
      </Typography>
    </BaseModal>
  );
}
