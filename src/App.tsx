import { Grid, grommet, Grommet, Header, Main, ThemeType } from "grommet";
import { deepMerge } from "grommet/utils";
import React, { useCallback, useMemo, useState } from "react";
import { BodyColorPicker } from "./BodyColorPicker";
import { CanvasStack } from "./CanvasStack";
import { ValidDimensions } from "./components/DimensionPicker";
import { GridMode } from "./components/Grid";
import { ConfirmModal, ConfirmModalProps } from "./modals/ConfirmModal";
import { ControlsBanner } from "./ControlsBanner";
import { ControlsFeedback } from "./ControlsFeedback";
import { RGBColor } from "./drivers/Color";
import { UndoablePaintCanvas } from "./drivers/UndoablePaintCanvas";
import { Footer } from "./Footer";
import { NewPageModal } from "./modals/NewPageModal";
import { AvailablePalettes } from "./PaletteDictionary";
import { PaletteModal } from "./modals/PaletteModal";
import { SettingsModal } from "./modals/SettingsModal";
import { Background, Brushes, Controls, Tools } from "./Tools";

const customTheme: ThemeType = {
  icon: {
    size: { medium: "20px" },
  },
  global: { edgeSize: { small: "8px" } },
};

const mergedTheme = deepMerge(grommet, customTheme);

const defaultPalette = "cga";
const defaultColor = "#5555ff";

const App = () => {
  const [pixelDimensions, setPixelDimensions] = useState<ValidDimensions>(16);
  const [color, setColor] = useState<RGBColor>(
    RGBColor.fromHexString(defaultColor)
  );

  const [confirmModalParameters, createModal] = useState<
    ConfirmModalProps | undefined
  >(undefined);

  const [tool, setTool] = useState<Tools>("paint");

  const [background, setBackground] = useState<Background>({
    type: "checkerboard",
    image: undefined,
    color: new RGBColor(0, 0, 0),
    size: "cover",
  });

  const [brush, setToolAndBrush] = useStickyBrush("paint", setTool);
  const [control, setControl] = useState<Controls>("paint");
  const [pickerMode, setPickerMode] = useState<"history" | "pinned">("pinned");
  const [gridMode, setGridShown] = useState<GridMode>("off");
  const [isPaletteModalShown, setPaletteMenuShown] = useState(false);
  const [
    isControlsFeedbackModalShown,
    setControlsFeedbackModalShown,
  ] = useState(false);
  const [palette, setPalette] = useState<AvailablePalettes>(defaultPalette);
  const [isNewPageModalShown, setCreateMenuShown] = useState(false);
  const [isSettingsMenuShown, setSettingsMenuShown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isFeedbackOn, setFeedbackOn] = useState(true);
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
    switch (tool) {
      case "dropper": {
        setTool(brush);
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
  const onGridButtonClick = () => {
    switch (gridMode) {
      case "off":
        setGridShown("lines");
        break;
      case "lines":
        setGridShown("dots");
        break;
      case "dots":
        setGridShown("off");
        break;
    }
  };

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
    setTool(brush);
  };

  const isConfirmModalShown = !!confirmModalParameters;
  /**
   * TODO: Add darkmode and settings modal
   */
  return (
    <Grommet
      theme={mergedTheme}
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
        rows={["auto", "auto", "flex", "36px"]}
      >
        <Header gridArea="header" justify="center">
          Pixel Pixy
        </Header>
        {isFeedbackOn && isControlsFeedbackModalShown && (
          <ControlsFeedback
            onClose={() => setControlsFeedbackModalShown(false)}
            control={control}
          />
        )}
        <CanvasStack
          stackProps={{ gridArea: "canvas", interactiveChild: "first" }}
          gridMode={gridMode}
          onCanvasCreated={onCanvasCreated}
          onCanvasTouch={onCanvasTouch}
          pixelDimensions={pixelDimensions}
          background={background}
        />

        <Main gridArea="body" pad="small" elevation="xsmall">
          <ControlsBanner
            color={color}
            tool={tool}
            gridMode={gridMode}
            onPickerModeClick={setPickerMode}
            onToolChange={setToolAndBrush}
            onGridButtonClick={onGridButtonClick}
            onPaletteButtonClick={onPaletteButtonClick}
            onRedoClick={onRedoClick}
            onUndoClick={onUndoClick}
            onTrashClick={onTrashClick}
            pickerMode={pickerMode}
            onControlsClick={(control) => {
              setControl(control);
              if (
                control !== "palette" &&
                control !== "trash" &&
                isFeedbackOn
              ) {
                setControlsFeedbackModalShown(true);
              }
            }}
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
          background={background}
          isDarkMode={darkMode}
          isFeedbackOn={isFeedbackOn}
          onCancel={() => setSettingsMenuShown(false)}
          setDarkMode={setDarkMode}
          onSave={(settingsData) => {
            const { backgroundData, isDarkMode, isFeedbackOn } = settingsData;
            setFeedbackOn(isFeedbackOn);
            setDarkMode(isDarkMode);
            setBackground(backgroundData);
            setSettingsMenuShown(false);
          }}
        />
      )}
    </Grommet>
  );
};

const useStickyBrush = (
  defaultBrush: Brushes,
  setTool: (tool: Tools) => void
) => {
  const [brush, setBrush] = useState<Brushes>(defaultBrush);

  const setToolAndBrush = useCallback(
    (tool: Tools) => {
      switch (tool) {
        case "fill": {
          setBrush("fill");
          break;
        }
        case "paint": {
          setBrush("paint");
          break;
        }
      }

      setTool(tool);
    },
    [setTool]
  );

  return [brush, setToolAndBrush] as const;
};

export default App;
