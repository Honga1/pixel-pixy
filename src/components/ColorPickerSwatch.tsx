import { Box, Grid, RangeInput, Stack } from "grommet";
import { useEffect, useState, useRef } from "react";
import { RGBColor } from "../drivers/color/src/RGBColor";
import { getRelativeClickPosition } from "../drivers/getRelativeClickPosition";
import "../styles/ColorPickerSwatch.css";
import styled from "styled-components";

export const ColorPickerSwatch = ({
  selectedColor,
  onColorPicked,
}: {
  selectedColor: RGBColor;
  onColorPicked: (color: RGBColor) => void;
}) => {
  const [currentHSL, setCurrentHSL] = useState(() => {
    const hsl = selectedColor.toHSL();

    return hsl;
  });

  useEffect(() => {
    const hsl = selectedColor.toHSL();
    if (hsl) {
      setCurrentHSL(hsl);
    }
  }, [selectedColor]);

  return (
    <Grid
      fill="horizontal"
      areas={[
        { name: "saturation-lightness", start: [0, 0], end: [0, 0] },
        {
          name: "hue",
          start: [0, 1],
          end: [0, 1],
        },
      ]}
      columns={["full"]}
      rows={["medium", "50px"]}
    >
      <Stack fill gridArea="saturation-lightness" interactiveChild={1}>
        <Box
          className="SelectedColor"
          style={{ backgroundColor: `hsl(${currentHSL.h}, 100%, 50%)` }}
        />
        <Box
          fill
          className="Saturation"
          onTouchEnd={(event) => {
            const {
              relativeX: scaledX,
              relativeY: scaledY,
            } = getRelativeClickPosition(event);
            currentHSL.s = scaledX;
            currentHSL.l = (1 - scaledY) * (1 - currentHSL.s / 2);
            setCurrentHSL(currentHSL.clone());
            onColorPicked(currentHSL.toRGB());
          }}
          onTouchMove={(event) => {
            const {
              relativeX: scaledX,
              relativeY: scaledY,
            } = getRelativeClickPosition(event);
            currentHSL.s = scaledX;
            currentHSL.l = (1 - scaledY) * (1 - currentHSL.s / 2);
            setCurrentHSL(currentHSL.clone());
          }}
        />
        <Box fill className="Lightness" />
      </Stack>
      <Box fill>
        <StyledInput
          type="range"
          min="0"
          max="360"
          color={`hsl(${currentHSL.h}, 100%, 50%)`}
          value={currentHSL.h}
          onTouchEnd={(event) => {
            const { relativeX: scaledX } = getRelativeClickPosition(event);
            currentHSL.h = scaledX * 360;
            setCurrentHSL(currentHSL.clone());
          }}
          onTouchMove={(event) => {
            const { relativeX: scaledX } = getRelativeClickPosition(event);
            currentHSL.h = scaledX * 360;
            setCurrentHSL(currentHSL.clone());
          }}
        />
      </Box>
    </Grid>
  );
};

interface StyledInputProps {
  color: string;
}

const StyledInput = styled.input.attrs<StyledInputProps>({})`
  &[type="range"]::-webkit-slider-thumb {
    background: ${(props) => props.color};
  }
  &[type="range"]::-moz-range-thumb {
    background: ${(props) => props.color};
  }
  &[type="range"]::-ms-thumb {
    background: ${(props) => props.color};
  }
`;
