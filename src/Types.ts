import { RGBColor } from "./drivers/color/src/RGBColor";

export type Tools = "paint" | "dropper" | "eraser" | "fill";
export type Brushes = "fill" | "paint";

export type Controls =
  | "undo"
  | "redo"
  | "paint"
  | "dropper"
  | "eraser"
  | "fill"
  | "grid"
  | "trash"
  | "history"
  | "pinned"
  | "paletteColor"
  | "palette";

export type Background = {
  type: "checkerboard" | "image" | "color";
  image: HTMLImageElement | undefined;
  color: RGBColor;
  size: "cover" | "contain";
};
