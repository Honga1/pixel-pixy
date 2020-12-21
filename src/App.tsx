import { Box, Button, Grid, grommet, Grommet, Stack } from "grommet";
import {
  Actions,
  Add,
  Brush,
  Erase,
  Grid as GridIcon,
  Redo,
  Trash,
  Undo,
} from "grommet-icons";
import React, { useMemo, useState } from "react";
import { CanvasContainer } from "./components/CanvasContainer";
import { ColorPickerHistory } from "./components/ColorPickerHistory";
import { ColorPickerSwatch } from "./components/ColorPickerSwatch";
import { ValidDimensions } from "./components/DimensionPicker";
import { DropperIcon } from "./components/DropperIcon";
import { Grid as ComponentGrid } from "./components/Grid";
import { PaletteIcon } from "./components/PaletteIcon";
import { PinnedColors } from "./components/PinnedColors";
import { SaveButton } from "./components/SaveButton";
import { ConfirmModal, ConfirmModalProps } from "./ConfirmModal";
import { NoColor, RGBColor } from "./drivers/Color";
import { UndoablePaintCanvas } from "./drivers/UndoablePaintCanvas";
import { NewModal } from "./NewModal";
import { AvailablePalettes, paletteColorDictionary } from "./PaletteDictionary";
import { PaletteModal } from "./PaletteModal";

const defaultPalette = "cga";
const defaultColor = "#5555ff";
function App() {
  const [pixelDimensions, setPixelDimensions] = useState<ValidDimensions>(8);
  const [color, setColor] = useState<RGBColor>(
    RGBColor.fromHexString(defaultColor)
  );

  const setColorMode = (color: RGBColor | NoColor) => {
    if (color === RGBColor.NO_COLOR) {
      setIsErasing(true);
    } else {
      setIsErasing(false);
      setColor(color);
    }
  };

  const [confirmModalParameters, setConfirmModalParameters] = useState<
    ConfirmModalProps | undefined
  >(undefined);
  const [isDropper, setIsDropper] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isGridShown, setGridShown] = useState(false);
  const [isPaletteMenuShown, setPaletteMenuShown] = useState(false);
  const [palette, setPalette] = useState<AvailablePalettes>(defaultPalette);
  const [isCreateMenuShown, setCreateMenuShown] = useState(false);
  const [canvas, setCanvas] = useState<undefined | HTMLCanvasElement>();

  const paint = useMemo(() => {
    return new UndoablePaintCanvas(pixelDimensions);
  }, [pixelDimensions]);

  const onCanvasTouch = (
    canvas: HTMLCanvasElement,
    event: React.TouchEvent<HTMLCanvasElement>
  ): void => {
    if (isDropper) {
      const coords = paint.touchToCoords(event);
      const color = paint.getColorAt(coords.quantX, coords.quantY);
      setColorMode(color);
      setIsDropper(false);
      return;
    }

    paint.setCanvas(canvas);
    paint.touchEvent(event, isErasing ? RGBColor.NO_COLOR : color);
    paint.drawToCanvas();
  };

  const onCanvasCreated = (canvas: HTMLCanvasElement): void => {
    setCanvas(canvas);
    paint.setCanvas(canvas);
  };

  const onUndoClick = () => {
    paint.undo();
    paint.drawToCanvas();
  };
  const onRedoClick = () => {
    paint.redo();
    paint.drawToCanvas();
  };
  const onPaletteButtonClick = () => setPaletteMenuShown(!isPaletteMenuShown);
  const onDropperButtonClick = () => setIsDropper(true);
  const onGridButtonClick = () => setGridShown(!isGridShown);
  const onEraserButtonClick = () => setColorMode(RGBColor.NO_COLOR);
  const onPaintButtonClick = () => setColorMode(color);
  return (
    <Grommet theme={grommet} style={{ height: "100%" }} themeMode="light">
      <Grid
        fill
        areas={[
          { name: "canvas", start: [0, 0], end: [0, 0] },
          { name: "body", start: [0, 1], end: [0, 1] },
          { name: "footer", start: [0, 2], end: [0, 2] },
        ]}
        columns={["full"]}
        rows={["auto", "flex", "xxsmall"]}
      >
        <Stack
          gridArea="canvas"
          interactiveChild={isPaletteMenuShown ? 1 : "first"}
        >
          <CanvasContainer
            onCanvasCreated={onCanvasCreated}
            pixelDimensions={pixelDimensions}
            onTouchEvent={onCanvasTouch}
          />

          {isPaletteMenuShown && (
            <ColorPickerSwatch
              selectedColor={color}
              onColorPicked={setColorMode}
            />
          )}

          {canvas && isGridShown && (
            <ComponentGrid
              pixelDimensions={pixelDimensions}
              rootCanvas={canvas}
            />
          )}
        </Stack>
        <Box gridArea="body" pad="small">
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
            </Box>
            <Box align="center" justify="center" direction="row-reverse">
              <Button onClick={onPaletteButtonClick} icon={<PaletteIcon />} />

              <Button
                onClick={onDropperButtonClick}
                style={{
                  borderRadius: "18px",
                  boxShadow: isDropper ? "0 0 2px 2px green" : "none",
                }}
                icon={<DropperIcon />}
              />

              <Button
                icon={<GridIcon />}
                style={{
                  borderRadius: "18px",
                  boxShadow: isGridShown ? "0 0 2px 2px green" : "none",
                }}
                onClick={onGridButtonClick}
              />
            </Box>
            <Box align="end" justify="end" direction="row" gap="small">
              <Button
                style={{
                  backgroundSize: "20%",
                  borderRadius: "18px",
                  boxShadow: isErasing ? "0 0 2px 2px green" : "none",
                }}
                onClick={onEraserButtonClick}
                icon={<Erase />}
              />
              <Button
                primary
                style={{
                  boxShadow: !isErasing ? "0 0 2px 2px green" : "none",
                }}
                color={color.toHex()}
                icon={<Brush />}
                onClick={onPaintButtonClick}
              />
            </Box>
          </Grid>
          <ColorPickerHistory onColorPicked={setColor} colorSelected={color} />
          <PinnedColors
            onColorPicked={setColor}
            pinnedColors={paletteColorDictionary[palette].map((colorString) =>
              RGBColor.fromHexString(colorString)
            )}
          />

          <Box direction="row" justify="end">
            <Button
              onClick={() => {
                setConfirmModalParameters({
                  onAccept: () => {
                    setConfirmModalParameters(undefined);

                    paint.clear();
                    if (paint.hasCanvas()) {
                      paint.drawToCanvas();
                    } else {
                      console.warn(
                        "Tried to clear a canvas that doesn't exist"
                      );
                    }
                  },
                  message: "Are you sure you want to clear the canvas?",
                  acceptButtonText: "Clear",
                  onCancel: () => {
                    setConfirmModalParameters(undefined);
                  },
                });
              }}
              icon={<Trash />}
            ></Button>
          </Box>
        </Box>

        <Box
          gridArea="footer"
          direction="row"
          pad={{ left: "small", right: "small" }}
        >
          <Grid
            columns={{
              count: 3,
              size: ["auto", "auto", "auto"],
            }}
            fill
            gap="small"
          >
            <Box align="start">
              <Button
                icon={<Actions />}
                onClick={() => console.log("clicked")}
              />
            </Box>
            <Box align="center">
              <Button icon={<Add />} onClick={() => setCreateMenuShown(true)} />
            </Box>
            <Box align="end">{canvas && <SaveButton canvas={canvas} />}</Box>
          </Grid>
        </Box>
      </Grid>

      {isPaletteMenuShown && (
        <PaletteModal
          onClickOutside={() => setPaletteMenuShown(false)}
          setColor={(color) => setColorMode(color)}
          palette={palette}
          setPalette={(palette) => setPalette(palette)}
        ></PaletteModal>
      )}

      {!!confirmModalParameters && (
        <ConfirmModal
          onAccept={confirmModalParameters.onAccept}
          onCancel={confirmModalParameters.onCancel}
          cancelButtonText={confirmModalParameters.cancelButtonText}
          acceptButtonText={confirmModalParameters.acceptButtonText}
          message={confirmModalParameters.message}
        />
      )}

      {isCreateMenuShown && (
        <NewModal
          onClickOutside={() => setCreateMenuShown(false)}
          onDimensionChange={setPixelDimensions}
          dimension={pixelDimensions}
          setLoadedImage={(image) => {
            paint.setPixelsFromImage(image);
            paint.drawToCanvas();
          }}
          setCreateMenuShown={() => setCreateMenuShown(false)}
          createNew={() => {
            paint.clear();
            paint.drawToCanvas();
          }}
        ></NewModal>
      )}
    </Grommet>
  );
}

export default App;
