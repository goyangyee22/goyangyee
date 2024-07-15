import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=".." element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
