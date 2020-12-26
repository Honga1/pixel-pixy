import { Box, Button, Grid } from "grommet";
import {
  Brush,
  Erase,
  Grid as GridIcon,
  History,
  Pin,
  Redo,
  Trash,
  Undo,
  Paint,
} from "grommet-icons";
import { DropperIcon } from "./components/DropperIcon";
import { PaletteIcon } from "./components/PaletteIcon";
import { RGBColor } from "./drivers/Color";
import { HighlightableButton } from "./HighlightableButton";

export const ToolsBanner = ({
  onBrushChange,
  onPickerModeClick,
  onUndoClick,
  onRedoClick,
  onPaletteButtonClick,
  onGridButtonClick,
  onTrashClick,
  isGridShown,
  color,
  pickerMode,
  brush,
}: {
  onPickerModeClick: (pickerMode: "history" | "pinned") => void;
  onUndoClick: () => void;
  onRedoClick: () => void;
  onPaletteButtonClick: () => void;
  onGridButtonClick: () => void;
  onTrashClick: () => void;
  onBrushChange: (brush: "eraser" | "paint" | "dropper" | "fill") => void;
  pickerMode: "history" | "pinned";
  brush: "eraser" | "paint" | "dropper" | "fill";
  isGridShown: boolean;
  color: RGBColor;
}) => {
  return (
    <Box height="xsmall">
      <Grid
        fill
        columns={["auto", "auto"]}
        rows={["flex", "flex"]}
        areas={[
          { name: "left-top", start: [0, 0], end: [0, 0] },
          { name: "left-bot", start: [0, 1], end: [0, 1] },
          { name: "right-top", start: [1, 0], end: [1, 0] },
          { name: "right-bot", start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box gridArea="left-top" direction="row">
          <HighlightableButton
            primary
            onClick={() => onBrushChange("paint")}
            isHighlighted={brush === "paint"}
            icon={<Brush />}
            color={color.toHex()}
          />
          <HighlightableButton
            onClick={() => onBrushChange("eraser")}
            isHighlighted={brush === "eraser"}
            icon={<Erase />}
          />
          <HighlightableButton
            primary
            onClick={() => onBrushChange("fill")}
            isHighlighted={brush === "fill"}
            icon={<Paint />}
            color={color.toHex()}
          />
          <Button onClick={onPaletteButtonClick} icon={<PaletteIcon />} />
          <HighlightableButton
            onClick={() => onBrushChange("dropper")}
            isHighlighted={brush === "dropper"}
            icon={<DropperIcon />}
          />
        </Box>
        <Box gridArea="left-bot" direction="row">
          <HighlightableButton
            icon={<History />}
            onClick={() => onPickerModeClick("history")}
            isHighlighted={pickerMode === "history"}
          />
          <HighlightableButton
            icon={<Pin />}
            onClick={() => onPickerModeClick("pinned")}
            isHighlighted={pickerMode === "pinned"}
          />
        </Box>
        <Box gridArea="right-top" direction="row" justify="end">
          <Button icon={<Undo />} onClick={onUndoClick} />
          <Button icon={<Redo />} onClick={onRedoClick} />
        </Box>
        <Box gridArea="right-bot" direction="row" justify="end">
          <Button onClick={onTrashClick} icon={<Trash />} />
          <HighlightableButton
            onClick={onGridButtonClick}
            isHighlighted={isGridShown}
            icon={<GridIcon />}
          />
        </Box>
      </Grid>
    </Box>
  );
};
