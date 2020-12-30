import { Box, Button, Layer } from "grommet";
import { Close } from "grommet-icons";
import { PropsWithChildren } from "react";

export const Modal = ({
  onClose,
  children,
}: PropsWithChildren<{ onClose: () => void }>) => {
  return (
    <Layer modal full="horizontal" onClickOutside={onClose}>
      <Box pad="small" fill>
        <Box direction="row" justify="end">
          <Button icon={<Close />} onClick={() => onClose()}></Button>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Layer>
  );
};
