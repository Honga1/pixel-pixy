import { ReactElement } from "react";
import { Select } from "./Select";
import "../styles/DimensionPicker.css";

const validDimensions = [
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

export type ValidDimensions = typeof validDimensions[number]["value"];

export const DimensionPicker = ({
  dimension,
  onDimensionChange,
}: {
  dimension: ValidDimensions;
  onDimensionChange: (dimension: ValidDimensions) => void;
}): ReactElement => {
  return (
    <label>
      Dimension
      <Select
        onChange={onDimensionChange}
        options={validDimensions}
        value={dimension}
      ></Select>
    </label>
  );
};
