import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Suppliers from './components/Suppliers';
import Orders from './components/Orders';
import Products from './components/Products';
import Management from './components/Management';
import Parameters from './components/Parameters';

function App() {
  return (
    <div className="App min-h-screen bg-goodFoodBeige-500">
      <div className="flex">
        <Navigation />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="management" element={<Management />} />
          <Route path="parameters" element={<Parameters />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
