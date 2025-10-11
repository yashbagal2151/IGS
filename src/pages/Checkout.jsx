import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  updateQty,
  removeFromCart,
} from "../features/cart/cartSlice";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = items.length > 0 ? 40 : 0;
  const mrpTotal = items.reduce((s, i) => s + (i.mrp || i.price) * i.qty, 0);
  const discount = Math.max(0, mrpTotal - subtotal);
  const payable = subtotal + delivery;
  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    address: true,
    payment: true,
    review: true,
  });

  const handlePay = async () => {
    alert("Payment placeholder. Integrate your gateway here.");
    dispatch(clearCart());
  };

  const handleQtyChange = (id, newQty) => {
    dispatch(updateQty({ id, qty: newQty }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  // Example address data (replace with dynamic/user data)
  const address = {
    name: "Mrutyunjay Kharade",
    details:
      "Society name, Flat no. 222, Katraj, Pune -411046, Maharashtra, India",
    phone: "+91 666 777 8888",
    email: "demo@gmail.com",
    type: "Home",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Steps */}
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">
          Secure Checkout
        </h1>

        {/* Address Section */}
        <div className="border rounded-lg mb-4 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-gray-800">
              User Address Details
            </span>
            <button className="text-purple-700 text-sm font-medium">
              Change
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <input type="radio" checked readOnly />
              <span className="font-semibold">{address.name}</span>
              <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                {address.type}
              </span>
            </div>
            <div className="text-sm text-gray-700 mb-1">{address.details}</div>
            <div className="text-sm text-gray-700 mb-1">
              Mobile: {address.phone}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              Email: {address.email}
            </div>
            <button className="mt-2 px-4 py-2 bg-purple-700 text-white rounded">
              Deliver to this address
            </button>
          </div>
        </div>

        {/* Payment Section */}
        <div className="border rounded-lg mb-4 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-gray-800">Payment Details</span>
            <button className="text-purple-700 text-sm font-medium">
              Change
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="radio" name="pay" defaultChecked />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-2 opacity-50">
                <input type="radio" name="pay" disabled />
                <span>UPI / Card (coming soon)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Review Products Section */}
        <div className="border rounded-lg mb-4 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-gray-800">Review Products</span>
            <button className="text-purple-700 text-sm font-medium">
              Verify Items
            </button>
          </div>
          <div className="p-4">
            {items.length === 0 ? (
              <div className="py-6 text-gray-500">Your cart is empty.</div>
            ) : (
              items.map((i) => (
                <div
                  key={i.id}
                  className="flex items-center gap-4 py-4 border-b last:border-b-0"
                >
                  <img
                    src={i.image}
                    alt={i.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{i.title}</div>
                    <div className="text-xs text-gray-500 mb-1">
                      Material:{" "}
                      <span className="font-medium">{i.material}</span>{" "}
                      &nbsp;|&nbsp; Size:{" "}
                      <span className="font-medium">{i.size}</span>
                    </div>
                    <div className="text-purple-700 font-bold text-lg mb-1">
                      ₹{i.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      Estimated Delivery:{" "}
                      <span className="font-medium">
                        Between 14 - 16 October, 8am - 10pm
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(i.id, i.qty - 1)}
                        className="px-2 py-1 text-gray-700 hover:bg-gray-50"
                        disabled={i.qty <= 1}
                      >
                        -
                      </button>
                      <div className="px-3 py-1 text-sm min-w-8 text-center">
                        {i.qty}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(i.id, i.qty + 1)}
                        className="px-2 py-1 text-gray-700 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(i.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove from cart
                    </button>
                  </div>
                </div>
              ))
            )}
            {items.length > 0 && (
              <div className="pt-4 text-right font-semibold text-purple-700">
                Subtotal ({items.length} item{items.length > 1 ? "s" : ""}): ₹
                {subtotal}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Pricing Summary */}
      <div>
        <div className="border rounded-lg p-4 bg-white shadow">
          <h2 className="font-semibold mb-3 text-gray-800">Pricing Details</h2>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Price:</span>
              <span>₹{mrpTotal}</span>
            </div>
            <div className="flex justify-between text-green-700">
              <span>Discount:</span>
              <span>-₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fees:</span>
              <span>₹{delivery}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Payable Price:</span>
              <span>₹{payable}</span>
            </div>
          </div>
          <button
            onClick={handlePay}
            className="w-full mt-4 px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
            disabled={items.length === 0}
          >
            Deliver to this address
          </button>
        </div>
      </div>
    </div>
  );
}
