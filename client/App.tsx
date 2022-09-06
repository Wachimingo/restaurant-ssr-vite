import React from 'react'
import { Routes, Route } from "react-router-dom";
import { NavBar } from './pages/_common/navbar/NavBar';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Catalog as AdminCatalog } from './pages/Admin_Catalog';
import { Sell } from './pages/Sell';

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
        <Route path="/admin/catalog" element={<AdminCatalog />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  )
}

export default App
