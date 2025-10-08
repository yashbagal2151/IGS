import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

// Stripe integration placeholder. For a real integration replace with server-driven PaymentIntent flow.
export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const dispatch = useDispatch();

  const handlePay = async () => {
    alert(
      "This is a placeholder. Integrate Stripe or your gateway backend and redirect to payment."
    );
    dispatch(clearCart());
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-4">
        <div className="text-gray-600">Items total: ₹{total}</div>
      </div>
      <div>
        <button
          onClick={handlePay}
          className="px-6 py-2 bg-indigo-600 text-white rounded"
        >
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
}
