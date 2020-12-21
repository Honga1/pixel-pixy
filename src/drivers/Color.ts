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

export type NoColor = "NO_COLOR";
export class RGBColor {
  static readonly NO_COLOR: NoColor = "NO_COLOR";
  /**
   * @param h Degrees
   * @param s Percent
   * @param l Percent
   */

  static fromHSL(h: number, s: number, l: number) {
    if (h < 0 || h > 359) {
      throw new RangeError("Hue should be between 0 and 359 inclusive");
    }
    if (s < 0 || s > 1) {
      throw new RangeError(
        "Saturation is a percentage and should be between 0 and 1 inclusive"
      );
    }
    if (l < 0 || l > 1) {
      throw new RangeError(
        "Lightness is a percentage and should be between 0 and 1 inclusive"
      );
    }

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return new RGBColor(r, g, b);
  }

  /**
   * @param hex A number between 0-16777215
   */
  static fromHex(hex: number) {
    if (!Number.isInteger(hex))
      throw new TypeError(`Number should be an integer, got: ${hex}`);
    if (hex < 0 || hex > (2 ^ 24)) {
      throw new RangeError("Number should be between 0-16777215 inclusive");
    }

    const hexString = hex.toString(16);

    return RGBColor.fromHexString("#" + hexString);
  }

  static fromRGBString(rgbString: string) {
    let sep = rgbString.indexOf(",") > -1 ? "," : " ";
    const rgbChunks = rgbString.substr(4).split(")")[0].split(sep);
    const rgbValues: number[] = [];

    for (let R in rgbChunks) {
      let r = rgbChunks[R];
      if (r.indexOf("%") > -1)
        rgbValues[R] =
          Math.round(parseFloat(r.substr(0, r.length - 1)) / 100) * 255;
    }

    const r = rgbValues[0];
    const g = rgbValues[1];
    const b = rgbValues[2];

    return new RGBColor(r, g, b);
  }

  static fromHexString(hexString: string) {
    if (hexString.length !== 7) {
      throw new TypeError(
        "Hex string is not 7 characters long. Got: " + hexString
      );
    }

    if (hexString[0] !== "#") {
      throw new TypeError(
        "Hex color string should start with #. Got: " + hexString[0]
      );
    }

    const r = parseInt("0x" + hexString[1] + hexString[2], 16);
    const g = parseInt("0x" + hexString[3] + hexString[4], 16);
    const b = parseInt("0x" + hexString[5] + hexString[6], 16);

    return new RGBColor(r, g, b);
  }

  constructor(red: number, green: number, blue: number) {
    this.rgb = [red, green, blue];
  }

  rgb: [number, number, number];

  get r() {
    return this.rgb[0];
  }
  get g() {
    return this.rgb[1];
  }
  get b() {
    return this.rgb[2];
  }

  set r(r: number) {
    this.rgb[0] = r;
  }
  set g(g: number) {
    this.rgb[1] = g;
  }
  set b(b: number) {
    this.rgb[2] = b;
  }

  static Equals(a: RGBColor, b: RGBColor) {
    const [r1, g1, b1] = a.rgb;
    const [r2, g2, b2] = b.rgb;

    return r1 === r2 && g1 === g2 && b1 === b2;
  }

  toHex() {
    const [r, g, b] = this.rgb;
    let rString = r.toString(16);
    let gString = g.toString(16);
    let bString = b.toString(16);

    if (rString.length === 1) rString = "0" + rString;
    if (gString.length === 1) gString = "0" + gString;
    if (bString.length === 1) bString = "0" + bString;

    return "#" + rString + gString + bString;
  }

  toHSL(): HSLColor {
    return HSLColor.fromRGB(...this.rgb);
  }
}
