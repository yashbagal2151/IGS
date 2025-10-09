import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductCollections from "./pages/ProductCollections.jsx";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";
import FilterPage from "./pages/FilterPage";

export default function RoutesMap() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductCollections />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/categories/:categorySlug" element={<CategoryPage />} />
      <Route path="/filter" element={<FilterPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
