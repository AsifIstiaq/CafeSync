"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const user_id = 1;

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  async function fetchOrders() {
    const res = await fetch(`http://localhost:4000/api/orders/user/${user_id}`);
    const data = await res.json();

    if (data.success) setOrders(data.data);
  }

  function formatToken(num) {
    if (!num) return "Not Assigned";
    return "T" + String(num).padStart(3, "0");
  }

  function statusBadge(status) {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      preparing: "bg-blue-100 text-blue-700",
      ready: "bg-green-100 text-green-700",
      served: "bg-gray-200 text-gray-700",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          map[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          My Orders
        </h1>
        <p className="text-sm text-gray-500">
          Track your order status in real time
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto">
        {orders.length === 0 ? (
          <div className="bg-white border rounded-xl p-6 text-center text-gray-500 shadow-sm">
            No orders found
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o[0]}
                className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4"
              >
                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      Order #{o[0]}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Item: {o[5]} × {o[6]}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Payment: {o[3]}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Token</p>
                    <p className="text-orange-500 font-bold text-sm">
                      {formatToken(o[4])}
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="my-3 border-t" />

                {/* BOTTOM ROW */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      Total:{" "}
                      <span className="font-semibold text-gray-800">
                        {o[2]} BDT
                      </span>
                    </p>
                  </div>

                  {statusBadge(o[1])}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
