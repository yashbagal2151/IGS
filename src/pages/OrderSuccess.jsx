import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-2">No order to show</h1>
        <Link to="/" className="text-purple-700 underline">Go home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">
        Your Order Has Been Placed Successfully!
      </h1>
      <p className="text-gray-700 mb-8">
        Thank you for shopping with us. Your beautiful statue will be delivered soon.
      </p>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
          <div>Order ID</div>
          <div className="col-span-2">Items</div>
          <div>Order Date</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        <div className="grid grid-cols-6 items-center px-4 py-3 text-sm">
          <div>{order.id}</div>
          <div className="col-span-2 flex items-center gap-4">
            <img src={order.items[0]?.image} alt="item" className="w-20 h-20 object-cover rounded" />
            <div>
              <div className="font-medium">{order.items[0]?.title}</div>
              <div className="text-xs text-gray-500">Material: {order.items[0]?.material} &nbsp; Size: {order.items[0]?.size}</div>
              <div className="text-purple-700 font-semibold">₹{order.items[0]?.price}</div>
              <div className="text-xs text-gray-500">Will be delivered by – <span className="font-semibold">14 October, 8am - 10pm</span></div>
            </div>
          </div>
          <div>{new Date(order.date).toLocaleDateString()}</div>
          <div>{order.items.reduce((s, i) => s + i.qty, 0)}</div>
          <div>₹{order.totals?.mrpTotal || order.totals?.subtotal}</div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 bg-purple-700 text-white rounded">Track package</button>
        <button className="px-4 py-2 border rounded">View or Edit order</button>
        <button className="px-4 py-2 border rounded">Download Invoice</button>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-purple-700 underline">Continue shopping</Link>
      </div>
    </div>
  );
}
