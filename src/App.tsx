import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { Mode } from "./theme/type";
import { darkMode, lightMode } from "./theme/palette";
import styled from "@emotion/styled";

const TestButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

function App() {
  const [mode, setMode] = useState<Mode>("light");

  return (
    <ThemeProvider
      theme={mode === "light" ? { palette: lightMode } : { palette: darkMode }}
    >
      <TestButton>Test</TestButton>
    </ThemeProvider>
  );
}

export default App;
