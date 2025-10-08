import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductCollections from "./pages/ProductCollections.jsx";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";

export default function RoutesMap() {
  return (
    <Routes>
      <Route path="/" element={<ProductCollections />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/products" element={<CategoryPage />} />
      <Route path="/categories/:categorySlug" element={<CategoryPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
