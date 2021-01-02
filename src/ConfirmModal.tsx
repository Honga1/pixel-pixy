import { Box, Button, Grid, Text } from "grommet";
import React from "react";
import { Modal } from "./Modal";

export type ConfirmModalProps = {
  onAccept: () => void;
  onCancel?: () => void;
  onClose: () => void;
  message?: string;
  acceptButtonText?: string;
  cancelButtonText?: string;
};

export const ConfirmModal = ({
  onAccept,
  onCancel,
  onClose,
  message = "Are you sure?",
  cancelButtonText = "Cancel",
  acceptButtonText = "Accept",
}: ConfirmModalProps) => {
  return (
    <Modal onClose={onClose} heading={"Confirm?"}>
      <Text alignSelf="center">{message}</Text>
      <Grid
        columns={{ count: 2, size: ["auto", "auto"] }}
        gap="small"
        pad={{ top: "medium", bottom: "small" }}
      >
        <Button label={cancelButtonText} onClick={onCancel} />
        <Button
          primary
          label={acceptButtonText}
          onClick={onAccept}
          alignSelf="end"
        />
      </Grid>
    </Modal>
  );
};
