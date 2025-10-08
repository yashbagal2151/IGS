import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import products from "../data/products.json";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // find product by id from products.json
  const product = products.find((p) => p.id === id);

  // if no product found, show fallback
  if (!product) {
    return (
      <div className="text-center mt-10 text-gray-500">Product not found.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
      <div className="flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full rounded-md"
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold">{product.title}</h2>
        <p className="text-xl font-bold mt-4">₹{product.price}</p>
        <p className="mt-4 text-gray-600">{product.description}</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Add to cart
          </button>
          <a href="/checkout" className="px-4 py-2 border rounded">
            Buy now
          </a>
        </div>
      </div>
    </div>
  );
}
