import { Box, Button, Grid, grommet, Grommet, Stack } from "grommet";
import { Trash } from "grommet-icons";
import React, { useMemo, useState } from "react";
import { CanvasContainer } from "./components/CanvasContainer";
import { ColorPickerHistory } from "./components/ColorPickerHistory";
import { ColorPickerSwatch } from "./components/ColorPickerSwatch";
import { ValidDimensions } from "./components/DimensionPicker";
import { Grid as ComponentGrid } from "./components/Grid";
import { PinnedColors } from "./components/PinnedColors";
import { ConfirmModal, ConfirmModalProps } from "./ConfirmModal";
import { NoColor, RGBColor } from "./drivers/Color";
import { UndoablePaintCanvas } from "./drivers/UndoablePaintCanvas";
import { Footer } from "./Footer";
import { NewModal } from "./NewModal";
import { AvailablePalettes, paletteColorDictionary } from "./PaletteDictionary";
import { PaletteModal } from "./PaletteModal";
import { ToolsBanner } from "./ToolsBanner";

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
          <ToolsBanner
            color={color}
            isDropper={isDropper}
            isErasing={isErasing}
            isGridShown={isGridShown}
            onDropperButtonClick={onDropperButtonClick}
            onEraserButtonClick={onEraserButtonClick}
            onGridButtonClick={onGridButtonClick}
            onPaintButtonClick={onPaintButtonClick}
            onPaletteButtonClick={onPaletteButtonClick}
            onRedoClick={onRedoClick}
            onUndoClick={onUndoClick}
          />

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
            />
          </Box>
        </Box>
        {canvas && (
          <Footer canvas={canvas} setCreateMenuShown={setCreateMenuShown} />
        )}
      </Grid>

      {isPaletteMenuShown && (
        <PaletteModal
          onClickOutside={() => setPaletteMenuShown(false)}
          setColor={(color) => setColorMode(color)}
          palette={palette}
          setPalette={(palette) => setPalette(palette)}
        />
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
        />
      )}
    </Grommet>
  );
}

export default App;
