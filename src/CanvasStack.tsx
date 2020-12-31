import { Stack, StackProps } from "grommet";
import { useState } from "react";
import { CanvasContainer } from "./components/CanvasContainer";
import { ValidDimensions } from "./components/DimensionPicker";
import { Grid } from "./components/Grid";
import { Backgrounds } from "./Tools";
export const CanvasStack = ({
  isGridShown,
  pixelDimensions,
  background,
  onCanvasCreated,
  onCanvasTouch,
  stackProps,
}: {
  isGridShown: boolean;
  pixelDimensions: ValidDimensions;
  background: Backgrounds;
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

      {canvas && isGridShown && (
        <Grid pixelDimensions={pixelDimensions} rootCanvas={canvas} />
      )}
    </Stack>
  );
};
