import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header.jsx";
import Home from "./pages/home/Index.jsx";
import Headphones from "./pages/headphones/Index.jsx";
import Speakers from "./pages/speakers/Index.jsx";
import Earphones from "./pages/earphones/Index.jsx";
import XX99MarkII from "./pages/headphones/XX99MarkII.jsx";
import XX99MarkI from "./pages/headphones/XX99MarkI.js";
import XX59 from "./pages/headphones/XX59";

const App: React.FC = () => {
  const cartCount = 3;
  return (
    <Router>
      <div className="font-texts">
        <Header cartCount={cartCount} />
        <ScrollToTop />
        <div className="bg-background app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/headphones" element={<Headphones />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/earphones" element={<Earphones />} />
            <Route path="/headphones/xx99-mark-ii" element={<XX99MarkII />} />
            <Route path="/headphones/xx99-mark-i" element={<XX99MarkI />} />
            <Route path="/headphones/xx59" element={<XX59 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
