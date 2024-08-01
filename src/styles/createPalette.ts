import { blue, common, green, lightBlue, orange, purple, red } from "../colors";
import { Color } from "../colors/type";

type Mode = "ligth" | "dark";

interface SimplePaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

type ColorPartial = Partial<Color>;

type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

interface PaletteOptions {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
  warning?: PaletteColorOptions;
  info?: PaletteColorOptions;
  success?: PaletteColorOptions;
  mode?: PaletteMode;
  tonalOffset?: PaletteTonalOffset;
  contrastThreshold?: number;
  common?: Partial<CommonColors>;
  grey?: ColorPartial;
  text?: Partial<TypeText>;
  divider?: string;
  action?: Partial<TypeAction>;
  background?: Partial<TypeBackground>;
  getContrastText?: (background: string) => string;
}

export const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.6)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    default: common.white,
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};

export const dark = {
  text: {
    primary: common.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212",
  },
  action: {
    active: common.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
};

const getDefaultPrimary = (mode: Mode) => {
  if (mode === "dark") {
    return {
      main: purple[200],
      light: purple[50],
      dark: purple[400],
    };
  }
  return {
    main: purple[500],
    light: purple[300],
    dark: purple[700],
  };
};
const getDefaultSecondary = (mode: Mode) => {
  if (mode === "dark") {
    return {
      main: blue[200],
      light: blue[50],
      dark: blue[400],
    };
  }
  return {
    main: blue[700],
    light: blue[400],
    dark: blue[800],
  };
};

const getDefaultError = (mode: Mode) => {
  if (mode === "dark") {
    return {
      main: red[500],
      light: red[300],
      dark: red[700],
    };
  }
  return {
    main: red[700],
    light: red[400],
    dark: red[800],
  };
};

const getDefaultInfo = (mode: Mode) => {
  if (mode === "dark") {
    return {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[700],
    };
  }
  return {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900],
  };
};

const getDefaultSuccess = (mode = "light") => {
  if (mode === "dark") {
    return {
      main: green[400],
      light: green[300],
      dark: green[700],
    };
  }
  return {
    main: green[800],
    light: green[500],
    dark: green[900],
  };
};

const getDefaultWarning = (mode = "light") => {
  if (mode === "dark") {
    return {
      main: orange[400],
      light: orange[300],
      dark: orange[700],
    };
  }
  return {
    main: orange[800], // closest to orange[800] that pass 3:1.
    light: orange[500],
    dark: orange[900],
  };
};

const createPalette = () => {};
