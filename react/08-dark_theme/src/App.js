import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Mainpage from "./pages/Mainpage";
import AboutPage from "./pages/AboutPage";
import { GlobalStyle } from "./theme/GlobalStyle";
import { ThemeChangeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeChangeProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Mainpage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </ThemeChangeProvider>
    </BrowserRouter>
  );
}

export default App;
