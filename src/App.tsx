import { Route, Routes } from "react-router-dom";

import { HomeScreen } from "./components/screen/HomeScreen";
import { HeaderComponent } from "./components/layout/HeaderComponent";
import { FooterComponent } from "./components/layout/FooterComponent";
import { AboutScreen } from "./components/screen/AboutScreen";
import { BirdsScreen } from "./components/screen/BirdsScreen";
import { FaqScreen } from "./components/screen/FaqScreen";
import { BlogScreen } from "./components/screen/BlogScreen";
import { SupportScreen } from "./components/screen/SupportScreen";
import { NotFound } from "./components/layout/NotFound";
import { ScrollToTop } from "./components/layout/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/birds" element={<BirdsScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/faq" element={<FaqScreen />} />
        <Route path="/blog" element={<BlogScreen />} />
        <Route path="/support" element={<SupportScreen />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
