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

export const backgroundTypes: Backgrounds["type"][] = [
  "checkerboard",
  "color",
  "image",
];
export interface BackgroundImageData {
  type: "image";
  image: HTMLImageElement;
  size: "contain" | "cover";
  color: RGBColor;
}

export const backgroundBackgroundImageSizes: BackgroundImageData["size"][] = [
  "contain",
  "cover",
];

export type BackgroundColorData = {
  type: "color";
  color: RGBColor;
};

export type Backgrounds =
  | { type: "checkerboard" }
  | BackgroundColorData
  | BackgroundImageData;
