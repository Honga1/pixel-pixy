import { RGBColor } from "./RGBColor";

export class HSLColor {
  /**
   * @param hslString A string following the possible forms
   * hsl(180 100% 50%)
   * hsl(180deg,100%,50%)
   * hsl(180deg 100% 50%)
   * hsl(3.14rad,100%,50%)
   * hsl(3.14rad 100% 50%)
   * hsl(0.5turn,100%,50%)
   * hsl(0.5turn 100% 50%)
   */
  static fromHSLString(hslString: string) {
    let sep = hslString.indexOf(",") > -1 ? "," : " ";
    const hsl = hslString.substr(4).split(")")[0].split(sep);

    let hString = hsl[0];
    let s = parseFloat(hsl[1].substr(0, hsl[1].length - 1)) / 100;
    let l = parseFloat(hsl[2].substr(0, hsl[2].length - 1)) / 100;

    let h = 0;

    if (hString.indexOf("deg") > -1)
      hString = hString.substr(0, hString.length - 3);
    else if (hString.indexOf("rad") > -1)
      h = Math.round(
        parseFloat(hString.substr(0, hString.length - 3)) * (180 / Math.PI)
      );
    else if (hString.indexOf("turn") > -1)
      h = Math.round(parseFloat(hString.substr(0, hString.length - 4)) * 360);
    // Keep hue fraction of 360 if ending up over
    if (h >= 360) h %= 360;

    return new HSLColor(h, s, l);
  }

  static fromRGB(r: number, g: number, b: number) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cMin = Math.min(r, g, b);
    let cMax = Math.max(r, g, b);
    let delta = cMax - cMin;
    let h = 0;
    let s = 0;
    let l = 0;

    // Calculate hue
    // No difference
    if (delta === 0) h = 0;
    // Red is max
    else if (cMax === r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cMax === g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cMax + cMin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return new HSLColor(h, s, l);
  }

  constructor(hue: number, saturation: number, lightness: number) {
    this.hsl = [hue, saturation, lightness];
  }

  hsl: [number, number, number];

  get h() {
    return this.hsl[0];
  }
  get s() {
    return this.hsl[1];
  }
  get l() {
    return this.hsl[2];
  }

  set h(h: number) {
    this.hsl[0] = h;
  }
  set s(s: number) {
    this.hsl[1] = s;
  }
  set l(l: number) {
    this.hsl[2] = l;
  }

  toHSLString() {
    const [h, s, l] = this.hsl;
    return "hsl(" + h + "," + s * 100 + "%," + l * 100 + "%)";
  }

  toRGB(): RGBColor {
    return RGBColor.fromHSL(...this.hsl);
  }

  clone(): HSLColor {
    return new HSLColor(...this.hsl);
  }
}
