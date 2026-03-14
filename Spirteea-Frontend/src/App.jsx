import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Empowerment from './pages/Empowerment';
import Career from './pages/Career';
import Contact from './pages/Contact';

import { MenuProvider } from './context/MenuContext';

function App() {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Products />} />
          <Route path="/empowerment" element={<Empowerment />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  );
}

export default App;
