import { Box, Button, Layer, Text } from "grommet";
import React from "react";

export type ConfirmModalProps = {
  onAccept: () => void;
  onCancel?: () => void;
  message?: string;
  acceptButtonText?: string;
  cancelButtonText?: string;
};

export const ConfirmModal = ({
  onAccept,
  onCancel,
  message = "Are you sure?",
  cancelButtonText = "Cancel",
  acceptButtonText = "Accept",
}: ConfirmModalProps) => {
  return (
    <Layer
      modal
      position="center"
      responsive={false}
      full="horizontal"
      onClickOutside={onCancel}
    >
      <Box gap="small" pad="small">
        <Text>{message}</Text>
        <Box direction="row" justify="between" gap="small">
          <Button
            label={cancelButtonText}
            onClick={onCancel}
            alignSelf="start"
          />
          <Button
            primary
            label={acceptButtonText}
            onClick={onAccept}
            alignSelf="end"
          />
        </Box>
      </Box>
    </Layer>
  );
};
