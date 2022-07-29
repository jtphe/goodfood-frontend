import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Suppliers from './components/Suppliers';
import SupplierDetails from 'components/Suppliers/SupplierDetails';
import Orders from './components/Orders';
import Products from './components/Products';
import Management from './components/Management';
import Parameters from './components/Parameters';
import Home from './components/Home';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/" element={<Home />}>
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="suppliers/:id" element={<SupplierDetails />} />
        <Route path="management" element={<Management />} />
        <Route path="parameters" element={<Parameters />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
