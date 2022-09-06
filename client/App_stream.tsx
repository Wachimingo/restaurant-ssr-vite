import React, { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom";
import { NavBar } from './pages/_common/navbar/NavBar';

const loadable = (factory: Parameters<typeof lazy>[0]) => () => {
  const Component = lazy(factory);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component />
    </Suspense>
  );
};

const Home = loadable(() => import("./pages/Home"));
const Catalog = loadable(() => import("./pages/Catalog"));
const Sell = loadable(() => import("./pages/Sell"));
const AdminCatalog = loadable(() => import("./pages/Admin_Catalog"));

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/sell" element={<Sell />} />
        {/* Admin routes */}
        <Route path="/admin/catalog" element={<AdminCatalog />} />
      </Routes>
    </>
  )
}

export default App
