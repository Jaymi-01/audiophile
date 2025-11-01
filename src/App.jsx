import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Home from './pages/home/Index.jsx';
import Headphones from './pages/headphones/Index.jsx'
import Speakers from './pages/speakers/Index.jsx'
import Earphones from './pages/earphones/Index.jsx'

const App = () => {
  return (
    <Router>
      <div className='font-texts'>
      <Header />
      <Routes className='bg-background app'>
          <Route path="/" element={<Home />} />
          <Route path='/headphones' element={<Headphones/>} />
          <Route path='/speakers' element={<Speakers />} />
          <Route path='/earphones' element={<Earphones />} />
        </Routes>
    </div>
    </Router>
    
  )
}

export default App