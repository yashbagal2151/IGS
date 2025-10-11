import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = items.length > 0 ? 40 : 0;
  const mrpTotal = items.reduce((s, i) => s + (i.mrp || i.price) * i.qty, 0);
  const discount = Math.max(0, mrpTotal - subtotal);
  const payable = subtotal + delivery;
  const dispatch = useDispatch();

  const [open, setOpen] = useState({ address: true, payment: false, review: false });

  const handlePay = async () => {
    alert("Payment placeholder. Integrate your gateway here.");
    dispatch(clearCart());
  };

  const Section = ({ title, isOpen, onToggle, children, actionText }) => (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <span className="text-sm text-purple-700">{actionText}</span>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Steps */}
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Secure Checkout</h1>

        {/* Address */}
        <Section
          title="User Address Details"
          isOpen={open.address}
          onToggle={() => setOpen((p) => ({ ...p, address: !p.address }))}
          actionText="Add new address"
        >
          <button className="px-4 py-2 bg-gray-200 rounded" disabled>
            Deliver to this address
          </button>
        </Section>

        {/* Payment Details */}
        <Section
          title="Payment Details"
          isOpen={open.payment}
          onToggle={() => setOpen((p) => ({ ...p, payment: !p.payment }))}
          actionText="Change"
        >
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
        </Section>

        {/* Review Products */}
        <Section
          title="Review Products"
          isOpen={open.review}
          onToggle={() => setOpen((p) => ({ ...p, review: !p.review }))}
          actionText="Verify Items"
        >
          <div className="divide-y">
            {items.map((i) => (
              <div key={i.id} className="py-3 flex justify-between text-sm">
                <span>
                  {i.title} × {i.qty}
                </span>
                <span>₹{i.price * i.qty}</span>
              </div>
            ))}
            {items.length === 0 && (
              <div className="py-6 text-gray-500">Your cart is empty.</div>
            )}
          </div>
        </Section>
      </div>

      {/* Right: Pricing Summary */}
      <div>
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-3">Pricing Details</h2>
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
