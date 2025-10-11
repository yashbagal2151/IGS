import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, updateQty, removeFromCart } from "../features/cart/cartSlice";
import addresses from "../data/addresses.json";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const delivery = items.length > 0 ? 40 : 0;
  const mrpTotal = useMemo(
    () => items.reduce((s, i) => s + (i.mrp || i.price) * i.qty, 0),
    [items]
  );
  const discount = Math.max(0, mrpTotal - subtotal);
  const payable = subtotal + delivery;
  const dispatch = useDispatch();

  const [open, setOpen] = useState({ address: true, payment: false, review: false });
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id
  );
  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId),
    [selectedAddressId]
  );

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
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label key={addr.id} className="flex gap-3 items-start p-3 border rounded-md">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                  className="mt-1 text-purple-700"
                />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">
                    {addr.name}
                    {addr.tag && (
                      <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded border text-gray-600">
                        {addr.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600">{addr.addressLine}</div>
                  <div className="text-gray-600">Mobile: {addr.mobile}</div>
                  <div className="text-gray-600">Email: {addr.email}</div>
                </div>
              </label>
            ))}
            <div className="flex justify-between items-center">
              <button className="text-sm text-purple-700">Add new address</button>
              <button className="px-4 py-2 bg-purple-700 text-white rounded">Deliver to this address</button>
            </div>
          </div>
        </Section>

        {/* Payment Details */}
        <Section
          title="Payment Details"
          isOpen={open.payment}
          onToggle={() => setOpen((p) => ({ ...p, payment: !p.payment }))}
          actionText="Change"
        >
          {/* UPI */}
          <div className="mb-4">
            <div className="text-sm font-semibold mb-2">UPI</div>
            <div className="flex items-center gap-4 mb-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="upi" /> PhonePe
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="upi" /> GPay
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="upi" /> Other UPI App
              </label>
              <input className="border px-2 py-1 rounded text-sm" placeholder="Enter UPI ID" />
              <button className="text-purple-700 text-sm">Verify ID</button>
            </div>
          </div>

          {/* Cards */}
          <div className="mb-4">
            <div className="text-sm font-semibold mb-2">Credit or Debit Card</div>
            <label className="flex items-center gap-2 mb-2 text-sm">
              <input type="radio" name="card" defaultChecked /> Bank of India debit card ending with 0000
            </label>
            <label className="flex items-center gap-2 mb-2 text-sm">
              <input type="radio" name="card" /> HDFC Bank credit card ending with 0000
            </label>
            <button className="text-purple-700 text-sm">Add new card</button>
          </div>

          {/* Netbanking */}
          <div className="mb-4">
            <div className="text-sm font-semibold mb-2">Netbanking</div>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Select your bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
            </select>
          </div>

          {/* COD */}
          <div>
            <div className="text-sm font-semibold mb-2">Cash on Delivery</div>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="cod" /> Cash on Delivery
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
              <div key={i.id} className="py-4 flex items-center gap-4 text-sm">
                <img src={i.image} alt={i.title} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{i.title}</div>
                  <div className="text-gray-500">
                    Material: {i.material || "-"} &nbsp; Size: {i.size || "-"}
                  </div>
                  <div className="text-purple-700 font-semibold">₹{i.price}</div>
                  <div className="text-xs text-gray-500">
                    Estimated Delivery - <span className="font-semibold">Between 14 - 16 October, 8am - 10pm</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() =>
                      i.qty > 1 ? dispatch(updateQty({ id: i.id, qty: i.qty - 1 })) : dispatch(removeFromCart(i.id))
                    }
                  >
                    -
                  </button>
                  <span>{i.qty}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => dispatch(updateQty({ id: i.id, qty: i.qty + 1 }))}
                  >
                    +
                  </button>
                </div>
                <div className="w-24 text-right font-medium">₹{i.price * i.qty}</div>
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
