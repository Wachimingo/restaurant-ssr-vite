import React, { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom";
import { NavBar } from './pages/_common/navbar/NavBar';
import './app.css';

const loadable = (factory: Parameters<typeof lazy>[0]) => () => {
  const Component = lazy(factory);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component />
    </Suspense>
  );
};

const Home = loadable(() => import("./pages/home/Home"));
const Catalog = loadable(() => import("./pages/catalog/Catalog"));
const Sell = loadable(() => import("./pages/sell/Sell"));

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/sell" element={<Sell />} />
        {/* Admin routes */}
        {/* <Route path="/admin/catalog" element={<AdminCatalog />} /> */}
      </Routes>
    </>
  )
}

export default App
