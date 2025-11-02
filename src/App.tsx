import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Home from './pages/home/Index.jsx';
import Headphones from './pages/headphones/Index.jsx'
import Speakers from './pages/speakers/Index.jsx'
import Earphones from './pages/earphones/Index.jsx'
import XX99MarkII from './pages/headphones/XX99MarkII.jsx'



const App: React.FC = () => {
  const cartCount = 3;
  return (
    <Router>
      <div className='font-texts'>
      <Header cartCount={cartCount} />
      <Routes className='bg-background app'>
          <Route path="/" element={<Home />} />
          <Route path='/headphones' element={<Headphones/>} />
          <Route path='/speakers' element={<Speakers />} />
          <Route path='/earphones' element={<Earphones />} />
          <Route path='/headphones/xx99-mark-ii' element={<XX99MarkII />} />
        </Routes>
    </div>
    </Router>
    
  )
}

export default App