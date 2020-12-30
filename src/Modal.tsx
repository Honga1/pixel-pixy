import { Box, Button, Layer, Text } from "grommet";
import { Close } from "grommet-icons";
import { PropsWithChildren } from "react";

export const Modal = ({
  onClose,
  children,
  heading,
}: PropsWithChildren<{ onClose: () => void; heading: string }>) => {
  return (
    <Layer modal full="horizontal" onClickOutside={onClose}>
      <Box pad="small" fill>
        <Box direction="row" fill={"horizontal"} justify="between">
          <Box justify="center">
            <Text>{heading}</Text>
          </Box>
          <Box direction="row" justify="end">
            <Button icon={<Close />} onClick={() => onClose()}></Button>
          </Box>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Layer>
  );
};
