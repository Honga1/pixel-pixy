import { Box, Button, Heading, Layer, Text } from "grommet";
import { Close } from "grommet-icons";
import { PropsWithChildren } from "react";

export const Modal = ({
  onClose,
  children,
  heading,
}: PropsWithChildren<{ onClose: () => void; heading: string }>) => {
  return (
    <Layer modal full="horizontal" onClickOutside={onClose}>
      <Box direction="row" fill={"horizontal"} justify="between" pad="small">
        <Heading
          alignSelf="center"
          level="2"
          margin={{ top: "0", bottom: "0" }}
        >
          {heading}
        </Heading>
        <Box direction="row" justify="end">
          <Button icon={<Close />} onClick={() => onClose()} />
        </Box>
      </Box>
      <Box fill pad="small">
        <Box gap="small">{children}</Box>
      </Box>
    </Layer>
  );
};
