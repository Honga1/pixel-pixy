import { Box, Grid, grommet, Grommet } from "grommet";
import React, { useMemo, useState } from "react";
import { BodyColorPicker } from "./BodyColorPicker";
import { CanvasStack } from "./CanvasStack";
import { ValidDimensions } from "./components/DimensionPicker";
import { ConfirmModal, ConfirmModalProps } from "./ConfirmModal";
import { RGBColor } from "./drivers/Color";
import { UndoablePaintCanvas } from "./drivers/UndoablePaintCanvas";
import { Footer } from "./Footer";
import { NewModal } from "./NewModal";
import { AvailablePalettes } from "./PaletteDictionary";
import { PaletteModal } from "./PaletteModal";
import { ToolsBanner } from "./ToolsBanner";

const defaultPalette = "cga";
const defaultColor = "#5555ff";

type Brushes = "paint" | "dropper" | "eraser";

const App = () => {
  const [pixelDimensions, setPixelDimensions] = useState<ValidDimensions>(16);
  const [color, setColor] = useState<RGBColor>(
    RGBColor.fromHexString(defaultColor)
  );

  const [confirmModalParameters, createModal] = useState<
    ConfirmModalProps | undefined
  >(undefined);

  const [brush, setBrush] = useState<Brushes>("paint");

  const [pickerMode, setPickerMode] = useState<"history" | "pinned">("pinned");
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
    switch (brush) {
      case "dropper": {
        setBrush("paint");
        const coords = paint.touchToCoords(event);
        const selectedColor = paint.getColorAt(coords.quantX, coords.quantY);
        if (selectedColor === RGBColor.NO_COLOR) break;
        setColor(selectedColor);
        break;
      }
      case "paint": {
        paint.setCanvas(canvas);
        paint.touchEvent(event, color);
        paint.drawToCanvas();
        break;
      }
      case "eraser": {
        paint.setCanvas(canvas);
        paint.touchEvent(event, RGBColor.NO_COLOR);
        paint.drawToCanvas();
        break;
      }
    }
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
  const onGridButtonClick = () => setGridShown(!isGridShown);

  const onTrashClick = () =>
    createModal({
      onAccept: () => {
        createModal(undefined);

        paint.clear();
        paint.drawToCanvas();
      },
      message: "Are you sure you want to clear the canvas?",
      acceptButtonText: "Clear",
      onCancel: () => {
        createModal(undefined);
      },
    });
  const setColorAndTurnOffPicker = (color: RGBColor): void => {
    setColor(color);
    setBrush("paint");
  };

  /**
   * TODO: Add darkmode and settings modal
   */
  return (
    <Grommet theme={grommet} style={{ height: "100%" }} themeMode="dark">
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
        <CanvasStack
          stackProps={{ gridArea: "canvas" }}
          isGridShown={isGridShown}
          isPaletteMenuShown={isPaletteMenuShown}
          onCanvasCreated={onCanvasCreated}
          onCanvasTouch={onCanvasTouch}
          pixelDimensions={pixelDimensions}
        />

        <Box gridArea="body" pad="small">
          <ToolsBanner
            color={color}
            brush={brush}
            isGridShown={isGridShown}
            onPickerModeClick={setPickerMode}
            onBrushChange={setBrush}
            onGridButtonClick={onGridButtonClick}
            onPaletteButtonClick={onPaletteButtonClick}
            onRedoClick={onRedoClick}
            onUndoClick={onUndoClick}
            onTrashClick={onTrashClick}
            pickerMode={pickerMode}
          />

          <BodyColorPicker
            pickerMode={pickerMode}
            color={color}
            palette={palette}
            setColorAndTurnOffPicker={setColorAndTurnOffPicker}
          />
        </Box>
        {canvas && (
          <Footer canvas={canvas} setCreateMenuShown={setCreateMenuShown} />
        )}
      </Grid>

      {isPaletteMenuShown && (
        <PaletteModal
          onClickOutside={() => setPaletteMenuShown(false)}
          setColor={setColorAndTurnOffPicker}
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
};

export default App;
