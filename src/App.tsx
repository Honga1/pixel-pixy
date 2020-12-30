import { Grid, grommet, Grommet, Header, Main } from "grommet";
import React, { useMemo, useState } from "react";
import { BodyColorPicker } from "./BodyColorPicker";
import { CanvasStack } from "./CanvasStack";
import { ValidDimensions } from "./components/DimensionPicker";
import { ConfirmModal, ConfirmModalProps } from "./ConfirmModal";
import { RGBColor } from "./drivers/Color";
import { UndoablePaintCanvas } from "./drivers/UndoablePaintCanvas";
import { Footer } from "./Footer";
import { NewPageModal } from "./NewPageModal";
import { AvailablePalettes } from "./PaletteDictionary";
import { PaletteModal } from "./PaletteModal";
import { SettingsModal } from "./SettingsModal";
import { ToolsBanner } from "./ToolsBanner";

const defaultPalette = "cga";
const defaultColor = "#5555ff";

type Brushes = "paint" | "dropper" | "eraser" | "fill";

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
  const [isPaletteModalShown, setPaletteMenuShown] = useState(false);
  const [palette, setPalette] = useState<AvailablePalettes>(defaultPalette);
  const [isNewPageModalShown, setCreateMenuShown] = useState(false);
  const [isSettingsMenuShown, setSettingsMenuShown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [canvas, setCanvas] = useState<undefined | HTMLCanvasElement>();
  const [pinnedColors, setPinnedColors] = useState<RGBColor[]>([]);
  const [colorHistory, setColorHistory] = useState<RGBColor[]>([]);

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
      case "fill": {
        paint.setCanvas(canvas);
        const coords = paint.touchToCoords(event);
        paint.fillWithColor(coords.quantX, coords.quantY, color);
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

  const onPaletteButtonClick = () => setPaletteMenuShown(!isPaletteModalShown);
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
      onClose: () => createModal(undefined),
    });
  const setColorAndTurnOffPicker = (color: RGBColor): void => {
    setColor(color);
    setBrush("paint");
  };

  const isConfirmModalShown = !!confirmModalParameters;
  /**
   * TODO: Add darkmode and settings modal
   */
  return (
    <Grommet
      theme={grommet}
      style={{ height: "100%" }}
      themeMode={darkMode ? "dark" : "light"}
    >
      <Grid
        fill
        areas={[
          { name: "header", start: [0, 0], end: [0, 0] },
          { name: "canvas", start: [0, 1], end: [0, 1] },
          { name: "body", start: [0, 2], end: [0, 2] },
          { name: "footer", start: [0, 3], end: [0, 3] },
        ]}
        columns={["full"]}
        rows={["auto", "auto", "flex", "xxsmall"]}
      >
        <Header gridArea="header" justify="center">
          Pixel Pixy
        </Header>
        <CanvasStack
          stackProps={{ gridArea: "canvas", interactiveChild: "first" }}
          isGridShown={isGridShown}
          isPaletteMenuShown={isPaletteModalShown}
          onCanvasCreated={onCanvasCreated}
          onCanvasTouch={onCanvasTouch}
          pixelDimensions={pixelDimensions}
        />

        <Main gridArea="body" pad="small" elevation="xsmall">
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
            setColorHistory={setColorHistory}
            colorHistory={colorHistory}
            pickerMode={pickerMode}
            color={color}
            palette={palette}
            pinnedColors={pinnedColors}
            setColorAndTurnOffPicker={setColorAndTurnOffPicker}
          />
        </Main>
        {canvas && (
          <Footer
            gridArea="footer"
            canvas={canvas}
            onAddButtonClicked={() => setCreateMenuShown(true)}
            setSettingsMenuShown={setSettingsMenuShown}
          />
        )}
      </Grid>

      {isPaletteModalShown && (
        <PaletteModal
          pinnedColors={pinnedColors}
          setPinnedColors={setPinnedColors}
          onCancel={() => setPaletteMenuShown(false)}
          setColor={setColorAndTurnOffPicker}
          palette={palette}
          setPalette={setPalette}
        />
      )}

      {isConfirmModalShown && (
        <ConfirmModal
          onClose={confirmModalParameters!.onClose}
          onAccept={confirmModalParameters!.onAccept}
          onCancel={confirmModalParameters!.onCancel}
          cancelButtonText={confirmModalParameters!.cancelButtonText}
          acceptButtonText={confirmModalParameters!.acceptButtonText}
          message={confirmModalParameters!.message}
        />
      )}

      {isNewPageModalShown && (
        <NewPageModal
          currentDimension={pixelDimensions}
          onCancel={() => setCreateMenuShown(false)}
          onCreateNew={(dimension, maybeLoadedImage) => {
            paint.clear();
            if (dimension !== pixelDimensions) {
              setPixelDimensions(dimension);
            }
            if (maybeLoadedImage !== undefined) {
              paint.setPixelsFromImage(maybeLoadedImage);
            }
            paint.drawToCanvas();
            setCreateMenuShown(false);
          }}
        />
      )}

      {isSettingsMenuShown && (
        <SettingsModal
          isDarkMode={darkMode}
          onClickOutside={() => setSettingsMenuShown(false)}
          resetMode={setDarkMode}
        />
      )}
    </Grommet>
  );
};

export default App;
