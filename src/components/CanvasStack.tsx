import { Stack, StackProps } from "grommet";
import { useState } from "react";
import { CanvasContainer } from "./CanvasContainer";
import { ValidDimensions } from "./DimensionPicker";
import { Grid, GridMode } from "./Grid";
import { Background } from "../Types";
export const CanvasStack = ({
  gridMode,
  pixelDimensions,
  background,
  onCanvasCreated,
  onCanvasTouch,
  stackProps,
}: {
  gridMode: GridMode;
  pixelDimensions: ValidDimensions;
  background: Background;
  onCanvasCreated: (canvas: HTMLCanvasElement) => void;
  onCanvasTouch: (
    canvas: HTMLCanvasElement,
    event: React.TouchEvent<HTMLCanvasElement>
  ) => void;
  stackProps: StackProps;
}) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  return (
    <Stack {...stackProps}>
      <CanvasContainer
        onCanvasCreated={(canvas) => {
          setCanvas(canvas);
          onCanvasCreated(canvas);
        }}
        background={background}
        pixelDimensions={pixelDimensions}
        onTouchEvent={onCanvasTouch}
      />

      {canvas && (
        <Grid
          pixelDimensions={pixelDimensions}
          rootCanvas={canvas}
          mode={gridMode}
        />
      )}
    </Stack>
  );
};
