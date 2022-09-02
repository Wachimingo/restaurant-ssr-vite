import React from 'react'
import { Routes, Route } from "react-router-dom";
import { NavBar } from './pages/_common/navbar/NavBar';
import { Home } from './pages/home/Home';
import { Catalog } from './pages/catalog/Catalog';
// import { Catalog as AdminCatalog } from './pages/admin/catalog';
import { Sell } from './pages/sell/Sell';
import './app.css';

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/sell" element={<Sell />} />
        {/* Admin routes */}
        {/* <Route path="/admin/catalog" element={<AdminCatalog />} /> */}
      </Routes>
      {/* </BrowserRouter> */}
    </>
  )
}

export default App
