type Brightness =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "a100"
  | "a200"
  | "a400"
  | "a700";

type ColorType =
  | "red"
  | "pink"
  | "purple"
  | "deeppurple"
  | "indigo"
  | "blue"
  | "lightblue"
  | "cyan"
  | "teal"
  | "green"
  | "lightgreen"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deeporange"
  | "brown"
  | "grey"
  | "bluegrey";

type Color = Record<ColorType, Partial<Record<Brightness, string>>>;

type Mode = "light" | "dark";

type Variant =
  | "primary"
  | "secondary"
  | "default"
  | "error"
  | "info"
  | "success"
  | "warning";
type BrightnessToken = "light" | "main" | "dark";

type Palette = Record<Variant, Record<BrightnessToken, string>>;

export type { Brightness, ColorType, Color, Mode, Variant, Palette };
