import { Box, Button, Grid } from "grommet";
import {
  Apps,
  Brush,
  Erase,
  Grid as GridIcon,
  History,
  Paint,
  Pin,
  Redo,
  Trash,
  Undo,
  Gallery,
} from "grommet-icons";
import { DropperIcon } from "./DropperIcon";
import { GridMode } from "./Grid";
import { PaletteIcon } from "./PaletteIcon";
import { RGBColor } from "../drivers/color/src/RGBColor";
import { HighlightableButton } from "./HighlightableButton";
import { Controls, Tools } from "../Types";

export const ControlsBanner = ({
  onToolChange,
  onPickerModeClick,
  onUndoClick,
  onRedoClick,
  onPaletteButtonClick,
  onGridButtonClick,
  onTrashClick,
  onControlsClick,
  gridMode,
  color,
  pickerMode,
  tool,
}: {
  onPickerModeClick: (pickerMode: "history" | "pinned" | "palette") => void;
  onUndoClick: () => void;
  onRedoClick: () => void;
  onPaletteButtonClick: () => void;
  onGridButtonClick: () => void;
  onTrashClick: () => void;
  onToolChange: (tool: Tools) => void;
  onControlsClick: (control: Controls) => void;
  pickerMode: "history" | "pinned" | "palette";
  tool: Tools;
  gridMode: GridMode;
  color: RGBColor;
}) => {
  const callBefore = <T extends any>(
    callback: (arg?: T) => void,
    control: Controls
  ) => {
    return (arg?: T) => {
      onControlsClick(control);
      if (arg) {
        callback(arg);
      } else {
        callback();
      }
    };
  };

  return (
    <Grid
      fill={"horizontal"}
      columns={["auto", "auto"]}
      rows={["36px", "36px"]}
      areas={[
        { name: "left-top", start: [0, 0], end: [0, 0] },
        { name: "left-bot", start: [0, 1], end: [0, 1] },
        { name: "right-top", start: [1, 0], end: [1, 0] },
        { name: "right-bot", start: [1, 1], end: [1, 1] },
      ]}
      gap="xsmall"
      pad={{ bottom: "small" }}
    >
      <Box gridArea="left-top" direction="row" gap="xsmall">
        <HighlightableButton
          primary
          onClick={callBefore(() => onToolChange("paint"), "paint")}
          isHighlighted={tool === "paint"}
          icon={<Brush />}
          color={color.toHex()}
        />
        <HighlightableButton
          onClick={callBefore(() => onToolChange("eraser"), "eraser")}
          isHighlighted={tool === "eraser"}
          icon={<Erase />}
        />
        <HighlightableButton
          primary
          onClick={callBefore(() => onToolChange("fill"), "fill")}
          isHighlighted={tool === "fill"}
          icon={<Paint />}
          color={color.toHex()}
        />
        <Button
          onClick={callBefore(onPaletteButtonClick, "palette")}
          icon={<PaletteIcon />}
          focusIndicator={false}
        />
        <HighlightableButton
          onClick={callBefore(() => onToolChange("dropper"), "dropper")}
          isHighlighted={tool === "dropper"}
          icon={<DropperIcon />}
        />
      </Box>
      <Box gridArea="left-bot" direction="row" gap="xsmall">
        <HighlightableButton
          icon={<History />}
          onClick={callBefore(() => onPickerModeClick("history"), "history")}
          isHighlighted={pickerMode === "history"}
        />
        <HighlightableButton
          icon={<Pin />}
          onClick={callBefore(() => onPickerModeClick("pinned"), "pinned")}
          isHighlighted={pickerMode === "pinned"}
        />

        <HighlightableButton
          icon={<Gallery />}
          onClick={callBefore(
            () => onPickerModeClick("palette"),
            "paletteColor"
          )}
          isHighlighted={pickerMode === "palette"}
        />
      </Box>
      <Box gridArea="right-top" direction="row" justify="end" gap="xsmall">
        <Button
          size="small"
          icon={<Undo />}
          onClick={callBefore(onUndoClick, "undo")}
          focusIndicator={false}
        />
        <Button
          icon={<Redo />}
          onClick={callBefore(onRedoClick, "redo")}
          focusIndicator={false}
        />
      </Box>
      <Box gridArea="right-bot" direction="row" justify="end" gap="xsmall">
        <Button
          onClick={callBefore(onTrashClick, "trash")}
          icon={<Trash />}
          focusIndicator={false}
        />
        <HighlightableButton
          onClick={callBefore(onGridButtonClick, "grid")}
          isHighlighted={gridMode !== "off"}
          icon={gridMode === "dots" ? <Apps /> : <GridIcon />}
        />
      </Box>
    </Grid>
  );
};
