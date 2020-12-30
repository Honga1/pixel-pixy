import { Box, Button, Text } from "grommet";
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
    <Modal onClose={onClose}>
      <Text alignSelf="center">{message}</Text>
      <Box direction="row" justify="between" gap="small">
        <Button label={cancelButtonText} onClick={onCancel} alignSelf="start" />
        <Button
          primary
          label={acceptButtonText}
          onClick={onAccept}
          alignSelf="end"
        />
      </Box>
    </Modal>
  );
};
