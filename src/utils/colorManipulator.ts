type ColorFormat = "rgb" | "rgba" | "hsl" | "hsla" | "color";
interface ColorObject {
  type: ColorFormat;
  values: [number, number, number] | [number, number, number, number];
  colorSpace?: "srgb" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec-2020";
}

function clamp(
  val: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
): number {
  return Math.max(min, Math.min(val, max));
}

const clampWrapper: (value: number, min?: number, max?: number) => number = (
  value,
  min = 0,
  max = 1,
) => {
  if (process.env.NODE_ENV !== "production") {
    if (value < min || value > max) {
      console.error(
        `MUI: The value provided ${value} is out of range [${min}, ${max}].`,
      );
    }
  }

  return clamp(value, min, max);
};

/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} hex - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */
const hexToRgb: (hex: string) => string = hex => {
  const color = hex.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, "g");
  const colors = color.match(re);

  if (colors && colors[0].length === 1) {
    return `rgb${colors.length === 4 ? "a" : ""}(${colors
      .map((n, index) => {
        return index < 3
          ? parseInt(n, 16)
          : Math.round((parseInt(n, 16) / 255) * 1000) / 1000;
      })
      .join(", ")})`;
  }

  return "";
};

const intToHex: (int: number) => string = int => {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */
const decomposeColor: (color: string) => ColorObject = color => {
  if (color.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf("(");
  const type: ColorFormat = color.substring(0, marker) as ColorFormat;

  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(
      "RKDWN-UI: Unsupported `%s` color.\n" +
        "The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().",
    );
  }

  let _value: string[] = [];
  let colorSpace: ColorObject["colorSpace"] = undefined;

  const colorValue = color.substring(marker + 1, color.length - 1);
  if (type === "color") {
    _value = colorValue.split(" ");
    colorSpace = _value.shift() as ColorObject["colorSpace"];
    if (_value.length === 4 && _value[3].charAt(0) === "/") {
      _value[3] = _value[3].slice(1);
    }
    if (
      colorSpace &&
      ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(
        colorSpace,
      ) === -1
    ) {
      throw new Error(
        "RKDWN-UI: unsupported `%s` color space.\n" +
          "The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.",
      );
    }
  } else {
    _value = colorValue.split(",");
  }

  const retVal: ColorObject["values"] = _value.map(value =>
    parseFloat(value),
  ) as ColorObject["values"];

  return { type, values: retVal, colorSpace };
};

/**
 * Returns a channel created from the input color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {string} - The channel for the color, that can be used in rgba or hsla colors
 */
const colorChannel: (color: string) => string = color => {
  const decomposedColor = decomposeColor(color);
  return decomposedColor.values
    .slice(0, 3)
    .map((val, idx) =>
      decomposedColor.type.indexOf("hsl") !== -1 && idx !== 0 ? `${val}%` : val,
    )
    .join(" ");
};

/**
 * Converts a color object with type and values to a string.
 * @param {object} _color - Decomposed color
 * @param {string} _color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla', 'color'
 * @param {array} _color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
const recomposeColor: (color: ColorObject) => string = color => {
  const { type, colorSpace, values } = color;

  let _retVal = [];
  if (type.indexOf("rgb") !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    _retVal = values.map((n, i) => (i < 3 ? parseInt(n.toString(), 10) : n));
  } else if (type.indexOf("hsl") !== -1) {
    _retVal[1] = `${values[1]}%`;
    _retVal[2] = `${values[2]}%`;
  }

  if (type.indexOf("color") !== -1) {
    return `${type}(${colorSpace} ${_retVal.join(" ")})`;
  } else {
    return `${type}(${_retVal.join(", ")})`;
  }
};

/**
 * Converts a color from CSS rgb format to CSS hex format.
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
 */
const rgbToHex: (color: string) => string = color => {
  // Idempotent
  if (color.indexOf("#") === 0) {
    return color;
  }

  const { values } = decomposeColor(color);
  return `#${values.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join("")}`;
};

/**
 * Converts a color from hsl format to rgb format.
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */
const hslToRgb: (color: string) => string = color => {
  const _color: ColorObject = decomposeColor(color);
  const { values } = _color;

  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type: ColorFormat = "rgb";
  const rgb: ColorObject["values"] = [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];

  if (_color.type === "hsla") {
    type = "rgba";
    rgb.push(values[3] ?? 0);
  }

  return recomposeColor({ type, values: rgb });
};

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} _color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
const getLuminance: (color: string) => number = color => {
  const _color = decomposeColor(color);

  let _rgbList =
    _color.type === "hsl" || _color.type === "hsla"
      ? decomposeColor(hslToRgb(color)).values
      : _color.values;

  const rgb = _rgbList.map(val => {
    if (_color.type !== "color") {
      val /= 255; // normalized
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });

  // Truncate at 3 digits
  return Number(
    (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3),
  );
};

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */
const getContrastRatio: (foreground: string, background: string) => number = (
  foreground,
  background,
) => {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
};

/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
const alpha: (color: string, value: number) => string = (color, value) => {
  const _color = decomposeColor(color);
  value = clampWrapper(value);

  if (_color.type === "rgb" || _color.type === "hsl") {
    _color.type = "rgba";
  }
  if (_color.type === "color") {
    // _color.values[3] = `/${value}`;
    _color.values[2] = _color.values[2] / (_color.values[3] ?? 1);
  } else {
    _color.values[3] = value;
  }

  return recomposeColor(_color);
};

/**
 * Darkens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
const darken: (color: string, coefficient: number) => string = (
  color,
  coefficient,
) => {
  const _color = decomposeColor(color);
  coefficient = clampWrapper(coefficient);

  if (_color.type.indexOf("hsl") !== -1) {
    _color.values[2] *= 1 - coefficient;
  } else if (
    _color.type.indexOf("rgb") !== -1 ||
    _color.type.indexOf("color") !== -1
  ) {
    for (let i = 0; i < 3; i += 1) {
      _color.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(_color);
};

/**
 * Lightens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
const lighten: (color: string, coefficient: number) => string = (
  color,
  coefficient,
) => {
  const _color = decomposeColor(color);
  coefficient = clampWrapper(coefficient);

  if (_color.type.indexOf("hsl") !== -1) {
    _color.values[2] += (100 - _color.values[2]) * coefficient;
  } else if (_color.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      _color.values[i] += (255 - _color.values[i]) * coefficient;
    }
  } else if (_color.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      _color.values[i] += (1 - _color.values[i]) * coefficient;
    }
  }

  return recomposeColor(_color);
};

/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
const emphasize: (color: string, coefficient: number) => string = (
  color,
  coefficient = 0.15,
) => {
  return getLuminance(color) > 0.5
    ? darken(color, coefficient)
    : lighten(color, coefficient);
};

/**
 * Blend a transparent overlay color with a background color, resulting in a single
 * RGB color.
 * @param {string} background - CSS color
 * @param {string} overlay - CSS color
 * @param {number} opacity - Opacity multiplier in the range 0 - 1
 * @param {number} [gamma=1.0] - Gamma correction factor. For gamma-correct blending, 2.2 is usual.
 */
const blend: (
  background: string,
  overlay: string,
  opacity: number,
  gamma: number,
) => string = (background, overlay, opacity, gamma = 1.0) => {
  const blendChannel = (b: number, o: number) =>
    Math.round(
      (b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma,
    );

  const backgroundColor = decomposeColor(background);
  const overlayColor = decomposeColor(overlay);

  const rgb: ColorObject["values"] = [
    blendChannel(backgroundColor.values[0], overlayColor.values[0]),
    blendChannel(backgroundColor.values[1], overlayColor.values[1]),
    blendChannel(backgroundColor.values[2], overlayColor.values[2]),
  ];

  return recomposeColor({
    type: "rgb",
    values: rgb,
  });
};

export {
  clamp,
  clampWrapper,
  hexToRgb,
  intToHex,
  decomposeColor,
  colorChannel,
  recomposeColor,
  rgbToHex,
  hslToRgb,
  getLuminance,
  getContrastRatio,
  alpha,
  darken,
  lighten,
  emphasize,
  blend,
};
