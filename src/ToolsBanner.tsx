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
} from "grommet-icons";
import { DropperIcon } from "./components/DropperIcon";
import { PaletteIcon } from "./components/PaletteIcon";
import { RGBColor } from "./drivers/Color";
import { HighlightableButton } from "./HighlightableButton";

export const ToolsBanner = ({
  onPickerModeClick,
  onUndoClick,
  onRedoClick,
  onPaletteButtonClick,
  onGridButtonClick,
  onEraserButtonClick,
  onPaintButtonClick,
  onDropperButtonClick,
  onTrashClick,
  isDropper,
  isGridShown,
  isErasing,
  color,
  pickerMode,
}: {
  onPickerModeClick: (pickerMode: "history" | "pinned") => void;
  onUndoClick: () => void;
  onRedoClick: () => void;
  onPaletteButtonClick: () => void;
  onGridButtonClick: () => void;
  onEraserButtonClick: () => void;
  onPaintButtonClick: () => void;
  onDropperButtonClick: () => void;
  onTrashClick: () => void;
  pickerMode: "history" | "pinned";
  isDropper: boolean;
  isGridShown: boolean;
  isErasing: boolean;
  color: RGBColor;
}) => {
  return (
    <Grid
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
          onClick={onPaintButtonClick}
          isHighlighted={!isErasing}
          icon={<Brush />}
          color={color.toHex()}
        />
        <HighlightableButton
          onClick={onEraserButtonClick}
          isHighlighted={isErasing}
          icon={<Erase />}
        />
        <Button onClick={onPaletteButtonClick} icon={<PaletteIcon />} />
        <HighlightableButton
          onClick={onDropperButtonClick}
          isHighlighted={isDropper}
          icon={<DropperIcon />}
        />
      </Box>
      <Box gridArea="left-bot" direction="row">
        <HighlightableButton
          icon={<Pin />}
          onClick={() => onPickerModeClick("pinned")}
          isHighlighted={pickerMode === "pinned"}
        />

        <HighlightableButton
          icon={<History />}
          onClick={() => onPickerModeClick("history")}
          isHighlighted={pickerMode === "history"}
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
  );
};