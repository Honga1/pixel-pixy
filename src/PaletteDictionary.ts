export const paletteColorDictionary: {
  [key: string]: string[];
} = {
  c64: [
    "#000000",
    "#FFFFFF",
    "#880000",
    "#AAFFEE",
    "#DD8855",
    "#664400",
    "#FF7777",
    "#333333",
    "#CC44CC",
    "#00CC55",
    "#0000AA",
    "#EEEE77",
    "#777777",
    "#AAFF66",
    "#0088FF",
    "#BBBBBB",
  ],
  cga: [
    "#000000",
    "#0000AA",
    "#00AA00",
    "#00AAAA",
    "#555555",
    "#5555FF",
    "#55FF55",
    "#55FFFF",
    "#AA0000",
    "#AA00AA",
    "#AA5500",
    "#AAAAAA",
    "#FF5555",
    "#FF55FF",
    "#FFFF55",
    "#FFFFFF",
  ],
  teletext: [
    "#000000",
    "#ff0000",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
    "#ffffff",
  ],
  Picker: ["#ff00ff"],
};

export const paletteNameDictionary = {
  c64: "Commodore 64",
  cga: "DOS CGA/ EGA",
  teletext: "Teletext",
} as const;

export type AvailablePalettes = keyof typeof paletteNameDictionary;
