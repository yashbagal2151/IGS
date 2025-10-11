import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { addToCart } from "../features/cart/cartSlice";
import { Star } from "lucide-react";

export default function ProductInfoModal({ isOpen, onClose, product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const title = product.name || product.title || "Product";
  const imageSrc = product.imageURL || product.image;
  const mrp = product.mrp;
  const discount = product.discount;
  const rating = product.rating;
  const reviews = product.reviews;
  const material = product.material;

  const increment = () => setQuantity((q) => Math.min(99, q + 1));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      dispatch(
        addToCart({ id: product.id, title, price: product.price, image: imageSrc })
      );
    }
    // Visual feedback could be handled by parent if needed
  };

  const handleBuyNow = () => {
    // Ensure item is in cart with selected quantity, then go to checkout
    for (let i = 0; i < quantity; i += 1) {
      dispatch(
        addToCart({ id: product.id, title, price: product.price, image: imageSrc })
      );
    }
    window.location.href = "/checkout";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[420px] w-auto object-contain rounded"
          />
        </div>

        <div className="flex flex-col gap-3">
          {(rating || reviews) && (
            <div className="flex items-center text-sm text-gray-600">
              {rating && (
                <>
                  <span className="mr-1">{rating}</span>
                  <Star size={16} className="text-yellow-500" fill="currentColor" />
                </>
              )}
              {reviews && <span className="ml-2 text-gray-500">({reviews} reviews)</span>}
            </div>
          )}

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-extrabold text-purple-700">₹{product.price}</span>
            {mrp && <span className="text-sm line-through text-gray-500">MRP: ₹{mrp}</span>}
            {discount && <span className="text-sm font-medium text-purple-600">{discount}</span>}
          </div>

          {material && (
            <div className="text-sm text-gray-700">
              Material: <span className="font-medium capitalize">{material}</span>
            </div>
          )}

          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-gray-600">Quantity</span>
            <div className="inline-flex items-center border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={decrement}
                className="px-3 py-1 text-gray-700 hover:bg-gray-50"
              >
                -
              </button>
              <div className="px-4 py-1 text-sm min-w-8 text-center">{quantity}</div>
              <button
                type="button"
                onClick={increment}
                className="px-3 py-1 text-gray-700 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleAddToCart}
              className="px-5 py-3 bg-white text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-50 transition"
            >
              + Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-5 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
