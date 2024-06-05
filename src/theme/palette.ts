import { COLOR } from "./color";
import { Palette } from "./type";
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    palette: Palette;
  }
}

const lightMode: Palette = {
  default: {
    light: COLOR.grey[300],
    main: COLOR.grey[500],
    dark: COLOR.grey[700],
  },
  primary: {
    light: COLOR.deeppurple[100],
    main: COLOR.deeppurple[300],
    dark: COLOR.deeppurple[500],
  },
  secondary: {
    light: COLOR.lightgreen[200],
    main: COLOR.lightgreen[400],
    dark: COLOR.lightgreen[600],
  },
  info: {
    light: COLOR.blue[300],
    main: COLOR.blue[500],
    dark: COLOR.blue[700],
  },
  success: {
    light: COLOR.green[300],
    main: COLOR.green[500],
    dark: COLOR.green[700],
  },
  warning: {
    light: COLOR.amber[300],
    main: COLOR.amber[500],
    dark: COLOR.amber[700],
  },
  error: {
    light: COLOR.deeporange[300],
    main: COLOR.deeporange[500],
    dark: COLOR.deeporange[700],
  },
};

const darkMode: Palette = {
  default: {
    light: COLOR.grey[50],
    main: COLOR.grey[200],
    dark: COLOR.grey[400],
  },
  primary: {
    light: COLOR.deeppurple.a100,
    main: COLOR.deeppurple.a200,
    dark: COLOR.deeppurple.a700,
  },
  secondary: {
    light: COLOR.lightgreen.a100,
    main: COLOR.lightgreen.a200,
    dark: COLOR.lightgreen.a700,
  },
  info: {
    light: COLOR.blue.a100,
    main: COLOR.blue.a200,
    dark: COLOR.blue.a700,
  },
  success: {
    light: COLOR.green.a200,
    main: COLOR.green.a400,
    dark: COLOR.green.a700,
  },
  warning: {
    light: COLOR.amber.a200,
    main: COLOR.amber.a400,
    dark: COLOR.amber.a700,
  },
  error: {
    light: COLOR.deeporange.a100,
    main: COLOR.deeporange.a200,
    dark: COLOR.deeporange.a700,
  },
};

export { lightMode, darkMode };
