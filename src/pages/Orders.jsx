import React from "react";
import { useSelector } from "react-redux";

const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });

export default function Orders() {
  const orders = useSelector((s) => s.orders.orders);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-gray-500">No orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-50 px-4 py-2 text-sm text-gray-700">
                <div className="font-semibold col-span-3">Order ID</div>
                <div className="font-semibold col-span-4">Items</div>
                <div className="font-semibold col-span-2">Order Date</div>
                <div className="font-semibold col-span-1">Qty</div>
                <div className="font-semibold col-span-2">Total</div>
              </div>
              {order.items.map((it, idx) => (
                <div key={idx} className="grid grid-cols-12 items-center px-4 py-3 text-sm border-t">
                  <div className="col-span-3 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full border text-gray-600">Ordered Placed</span>
                    <span className="text-gray-600">{order.id}</span>
                  </div>
                  <div className="col-span-4 flex items-center gap-4">
                    <img src={it.image} alt={it.title} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <div className="font-medium">{it.title}</div>
                      <div className="text-xs text-gray-500">Material: {it.material || '-'} Size: {it.size || '-'}</div>
                      <div className="text-purple-700 font-semibold">₹{it.price}</div>
                      <div className="text-xs text-gray-500">Will be delivered by - {formatDate(order.date)}</div>
                    </div>
                  </div>
                  <div className="col-span-2">{formatDate(order.date)}</div>
                  <div className="col-span-1">{it.qty || 1}</div>
                  <div className="col-span-2">₹{order.totals?.payable || it.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
