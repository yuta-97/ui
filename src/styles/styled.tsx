import emotionStyled from "@emotion/styled";

const THEME_ID = "$$rkdwn-ui";

const createStyled = (tag, options) => {
  const stylesFactory = emotionStyled(tag, options);

  if (process.env.NODE_ENV !== "production") {
    return (...styles) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles.length === 0) {
        console.error(
          [
            `MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`,
            'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
          ].join("\n"),
        );
      } else if (styles.some(style => style === undefined)) {
        console.error(
          `MUI: the styled(${component})(...args) API requires all its args to be defined.`,
        );
      }
      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
};

const styled = createStyled({
  themeId: THEME_ID,
});

export default styled;
