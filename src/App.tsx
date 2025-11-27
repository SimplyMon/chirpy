import { Route, Routes } from "react-router-dom";

import { HomeScreen } from "./components/screen/HomeScreen";
import { HeaderComponent } from "./components/layout/HeaderComponent";
import { FooterComponent } from "./components/layout/FooterComponent";
import { AboutScreen } from "./components/screen/AboutScreen";
import { NotFound } from "./components/layout/NotFound";

function App() {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
