import { Box, Button, Typography } from "@mui/material";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface IConfirmActionModal {
  callAction?: boolean;
  title: string;
  message: string;
}

export default function ConfirmActionModal() {
  const {
    props,
    props: { title, message },
    onClose: closeModal,
    onUpdate: updateProps,
  } = useModal<IConfirmActionModal>("confirm-action-modal");

  const handleSave = () => {
    updateProps({ ...props, callAction: true });
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
      <Button variant="text" color="error" onClick={() => closeModal()}>
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
