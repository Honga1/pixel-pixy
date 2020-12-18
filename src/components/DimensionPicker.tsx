import { Select } from "grommet";
import { ReactElement } from "react";
import "../styles/DimensionPicker.css";

const validDimensions = [
  { value: 1, label: "1x1" },
  { value: 8, label: "8x8" },
  { value: 10, label: "10x10" },
  { value: 12, label: "12x12" },
  { value: 14, label: "14x14" },
  { value: 16, label: "16x16" },
  { value: 18, label: "18x18" },
  { value: 20, label: "20x20" },
  { value: 22, label: "22x22" },
  { value: 24, label: "24x24" },
] as const;

const labelToValue = {
  "1x1": 1,
  "8x8": 8,
  "10x10": 10,
  "12x12": 12,
  "14x14": 14,
  "16x16": 16,
  "18x18": 18,
  "20x20": 20,
  "22x22": 22,
  "24x24": 24,
} as const;

const valueToLabel = {
  1: "1x1",
  8: "8x8",
  10: "10x10",
  12: "12x12",
  14: "14x14",
  16: "16x16",
  18: "18x18",
  20: "20x20",
  22: "22x22",
  24: "24x24",
} as const;

const options = [
  "1x1",
  "8x8",
  "10x10",
  "12x12",
  "14x14",
  "16x16",
  "18x18",
  "20x20",
  "22x22",
  "24x24",
];

export type ValidDimensions = typeof validDimensions[number]["value"];

export const DimensionPicker = ({
  dimension,
  onDimensionChange,
}: {
  dimension: ValidDimensions;
  onDimensionChange: (dimension: ValidDimensions) => void;
}): ReactElement => {
  return (
    <Select
      name="Select Dimensions"
      placeholder="8x8"
      value={valueToLabel[dimension]}
      options={options}
      onChange={({ option }: { option: keyof typeof labelToValue }) =>
        onDimensionChange(labelToValue[option])
      }
    />
  );
};
