import { RGBColor } from "./drivers/Color";

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
  | "palette"
  | "pinned";

export type Background = {
  type: "checkerboard" | "image" | "color";
  image: HTMLImageElement | undefined;
  color: RGBColor;
  size: "cover" | "contain";
};
