import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Home from './pages/home/Index.jsx';

const App = () => {
  return (
    <Router>
      <div className='font-texts'>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/career" element={<Career />} /> */}
        </Routes>
    </div>
    </Router>
    
  )
}

export default App