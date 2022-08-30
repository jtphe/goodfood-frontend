import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Suppliers from './components/Suppliers';
import SupplierDetail from 'components/Suppliers/SupplierDetail';
import Orders from './components/Orders';
import Products from './components/Products';
import ProductEdit from 'components/Products/ProductEdit';
import Management from './components/Management';
import Parameters from './components/Parameters';
import Home from './components/Home';
import NotFound from './components/NotFound';
import ProductAdd from 'components/Products/ProductAdd';
import OrderDetails from 'components/Orders/OrderDetails';
import Forgot from 'components/Forgot';

function App() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/" element={<Home />}>
        <Route path="orders" element={<Orders />} />
        <Route path="orders/details/:id" element={<OrderDetails />} />
        <Route path="products" element={<Products />} />
        <Route path="products/edit/:id" element={<ProductEdit />} />
        <Route path="products/add" element={<ProductAdd />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="suppliers/:id" element={<SupplierDetail />} />
        <Route path="management" element={<Management />} />
        <Route path="parameters" element={<Parameters />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
