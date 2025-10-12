import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../features/orders/ordersSlice";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function Orders() {
  const dispatch = useDispatch();
  const allOrders = useSelector((s) => s.orders.orders);

  const [activeTab, setActiveTab] = React.useState("orders"); // 'orders' | 'current' | 'previous'
  const [query, setQuery] = React.useState("");

  const matchesQuery = (order) => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return (
      order.id.toLowerCase().includes(q) ||
      order.items?.some((it) => it.title?.toLowerCase().includes(q))
    );
  };

  const currentOrders = React.useMemo(
    () => allOrders.filter((o) => ["placed", "processing"].includes(o.status) && matchesQuery(o)),
    [allOrders, query]
  );
  const previousOrders = React.useMemo(
    () => allOrders.filter((o) => ["delivered", "cancelled"].includes(o.status) && matchesQuery(o)),
    [allOrders, query]
  );
  const filteredAll = React.useMemo(
    () => allOrders.filter(matchesQuery),
    [allOrders, query]
  );

  const data = activeTab === "orders" ? filteredAll : activeTab === "current" ? currentOrders : previousOrders;

  const StatusPill = ({ status }) => (
    <span
      className={
        "text-xs px-2 py-1 rounded border " +
        (status === "delivered"
          ? "text-green-700 border-green-300"
          : status === "cancelled"
          ? "text-red-700 border-red-300"
          : "text-yellow-700 border-yellow-300")
      }
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );

  const ActionButtons = ({ order }) => {
    if (activeTab === "previous") {
      return (
        <div className="flex flex-col gap-2">
          <button className="px-3 py-1 border rounded text-sm">Download Invoice</button>
          <button className="px-3 py-1 border rounded text-sm">View order details</button>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-2">
        <button className="px-3 py-1 bg-purple-700 text-white rounded text-sm">Track package</button>
        <button className="px-3 py-1 border rounded text-sm">View or Edit order</button>
        <button
          className="px-3 py-1 border rounded text-sm text-red-600"
          onClick={() => dispatch(updateOrderStatus({ id: order.id, status: "cancelled" }))}
        >
          Cancel Order
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6 text-sm">
          <button
            className={`pb-2 ${activeTab === "orders" ? "border-b-2 border-purple-700 text-purple-700" : "text-gray-600"}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`pb-2 ${activeTab === "current" ? "border-b-2 border-purple-700 text-purple-700" : "text-gray-600"}`}
            onClick={() => setActiveTab("current")}
          >
            Current Orders
          </button>
          <button
            className={`pb-2 ${activeTab === "previous" ? "border-b-2 border-purple-700 text-purple-700" : "text-gray-600"}`}
            onClick={() => setActiveTab("previous")}
          >
            Previous Orders
          </button>
        </div>
        <div>
          <input
            className="border rounded px-3 py-1 text-sm min-w-[220px]"
            placeholder="Search an order"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-gray-500">No orders.</div>
      ) : (
        <div className="space-y-6">
          {data.map((order) => (
            <div key={order.id} className="border rounded-lg">
              <div className="grid grid-cols-12 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-700">
                <div className="col-span-2">Order ID</div>
                <div className="col-span-5">Items</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2">Order Date</div>
                <div className="col-span-1">Quantity</div>
                <div className="col-span-1">Total</div>
              </div>

              {order.items.map((it, idx) => (
                <div key={idx} className="grid grid-cols-12 items-center gap-3 px-4 py-3 border-t text-sm">
                  <div className="col-span-2">{order.id}</div>
                  <div className="col-span-5 flex items-center gap-4">
                    <img src={it.image} alt={it.title} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <div className="font-medium">{it.title}</div>
                      <div className="text-xs text-gray-500">Material: {it.material || "-"} &nbsp; Size: {it.size || "-"}</div>
                      <div className="text-purple-700 font-semibold">₹{it.price}</div>
                      <div className="text-[11px] text-gray-500">Will be delivered by - {formatDate(order.date)}</div>
                    </div>
                  </div>
                  <div className="col-span-1"><StatusPill status={order.status || "placed"} /></div>
                  <div className="col-span-2">{formatDate(order.date)}</div>
                  <div className="col-span-1">{it.qty || 1}</div>
                  <div className="col-span-1">₹{order.totals?.payable || it.price}</div>
                </div>
              ))}

              <div className="px-4 py-3 border-t">
                <ActionButtons order={order} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
