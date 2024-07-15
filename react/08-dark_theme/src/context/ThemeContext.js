import { createContext, useState } from "react";
import { darkTheme, lightTheme } from "../theme/theme";
import { ThemeProvider as StyledProvider } from "styled-components";

const ThemeContext = createContext();

function ThemeChangeProvider({ children }) {
  // 일몰시간 불러오는 API
  // 결과값을 가지고 조건문으로 light냐 dark
  const [themeMode, setThemeMode] = useState("light");
  const themeObject = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeChangeProvider };
