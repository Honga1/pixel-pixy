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

  console.log("anything");

  return (
    <Grid
      fill
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

const StyledInput = styled.input<{ color: string }>`
  &[type="range"] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  &[type="range"]:focus {
    outline: none;
  }
  &[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 20px;
    cursor: pointer;
    background: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
    border-radius: 2px;
    border: none;
  }
  &[type="range"]::-webkit-slider-thumb {
    height: 30px;
    width: 30px;
    border-radius: 26px;
    box-shadow: 0 0 2px 2px lightgreen;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }
  &[type="range"]::-webkit-slider-thumb {
    ${(props) => `background:${props.color};`}
  }
  &[type="range"]:focus::-webkit-slider-runnable-track {
    background: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }
  &[type="range"]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
    border-radius: 2px;
    border: none;
  }
  &[type="range"]::-moz-range-thumb {
    height: 30px;
    width: 30px;
    border-radius: 26px;
    box-shadow: 0 0 2px 2px lightgreen;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }
  &[type="range"]::-moz-range-thumb {
    ${(props) => `background:${props.color};`}
  }
  &[type="range"]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  &[type="range"]::-ms-thumb {
    height: 30px;
    width: 30px;
    border-radius: 26px;
    box-shadow: 0 0 2px 2px lightgreen;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }
  &[type="range"]::-ms-thumb {
    ${(props) => `background:${props.color};`}
  }
`;
