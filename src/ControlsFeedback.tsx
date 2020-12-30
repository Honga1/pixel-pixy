import { Layer, Text, Box } from "grommet";
import { Controls } from "./Tools";
import { useTimeout } from "./useTimeout";

import "./styles/ControlsFeedback.css";
import { useState } from "react";

const controlToFeedback: Record<Controls, string> = {
  dropper: "Dropper",
  eraser: "Eraser",
  fill: "Fill",
  grid: "Grid",
  history: "Recent colors",
  paint: "Pixel brush",
  palette: "Palette",
  pinned: "Pinned colors",
  redo: "Redo",
  undo: "Undo",
  trash: "Clear canvas",
};
export const ControlsFeedback = ({
  onClose,
  control,
}: {
  onClose: () => void;
  control: Controls;
}) => {
  const [opacity, setOpacity] = useState(1);
  useTimeout(onClose, 800);
  useTimeout(() => setOpacity(0), 400);
  return (
    <Layer
      position="center"
      responsive={false}
      onClickOutside={onClose}
      modal={false}
      animation="none"
      className="ControlsFeedback"
      style={{ opacity, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
    >
      <Box pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text style={{ color: "black" }}>{controlToFeedback[control]}</Text>
      </Box>
    </Layer>
  );
};
