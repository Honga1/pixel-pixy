import { Box, Button, Grid } from "grommet";
import { DropperIcon } from "./components/DropperIcon";
import { HighlightableButton } from "./HighlightableButton";
import {
  Grid as GridIcon,
  Undo,
  Redo,
  Brush,
  Erase,
  Trash,
} from "grommet-icons";
import { PaletteIcon } from "./components/PaletteIcon";
import { RGBColor } from "./drivers/Color";

export const ToolsBanner = ({
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
}: {
  onUndoClick: () => void;
  onRedoClick: () => void;
  onPaletteButtonClick: () => void;
  onGridButtonClick: () => void;
  onEraserButtonClick: () => void;
  onPaintButtonClick: () => void;
  onDropperButtonClick: () => void;
  onTrashClick: () => void;
  isDropper: boolean;
  isGridShown: boolean;
  isErasing: boolean;
  color: RGBColor;
}) => {
  return (
    <Grid
      columns={{
        count: 3,
        size: ["auto", "auto", "auto"],
      }}
      rows="flex"
    >
      <Box direction="row" gap="">
        <Button icon={<Undo />} onClick={onUndoClick} />
        <Button icon={<Redo />} onClick={onRedoClick} />
        <Button onClick={onTrashClick} icon={<Trash />} />
      </Box>
      <Box align="center" justify="center" direction="row-reverse">
        <Button onClick={onPaletteButtonClick} icon={<PaletteIcon />} />

        <HighlightableButton
          onClick={onDropperButtonClick}
          isHighlighted={isDropper}
          icon={<DropperIcon />}
        />

        <HighlightableButton
          onClick={onGridButtonClick}
          isHighlighted={isGridShown}
          icon={<GridIcon />}
        />
      </Box>
      <Box align="end" justify="end" direction="row" gap="small">
        <HighlightableButton
          onClick={onEraserButtonClick}
          isHighlighted={isErasing}
          icon={<Erase />}
        />

        <HighlightableButton
          primary
          onClick={onPaintButtonClick}
          isHighlighted={!isErasing}
          icon={<Brush />}
          color={color.toHex()}
        />
      </Box>
    </Grid>
  );
};
