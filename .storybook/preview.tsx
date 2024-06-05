import { ThemeProvider } from "@emotion/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { darkMode, lightMode } from "../src/theme/palette";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

/**
 * 라이브러리 사용하는 곳에서는 별도로 Provider를 설정해서 사용하면 된다.
 * 해당 부분은 Storybook에서만 사용하는 설정이다.
 * 때문에 실제 사용 시 theme 설정의 구조가 다를 수 있다.
 */
const decorators = [
  withThemeFromJSXProvider({
    themes: {
      lightMode: {
        palette: lightMode,
      },
      darkMode: {
        palette: darkMode,
      },
    },
    defaultTheme: "lightMode",
    Provider: ThemeProvider,
  }),
];

export default preview;
export { decorators };
