"use client";

import { useEffect, useState } from "react";

const API = "http://localhost:4000/api/queue";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const res = await fetch(`${API}/orders`);
    const data = await res.json();

    if (data.success) setOrders(data.data);
  }

  async function generateToken(order_id) {
    const res = await fetch(`${API}/generate-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id }),
    });

    const data = await res.json();

    if (data.success) {
      alert(`Token Generated: T${String(data.token_number).padStart(3, "0")}`);
      fetchOrders();
    }
  }

  async function updateStatus(order_id, status) {
    await fetch(`${API}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id, status }),
    });

    fetchOrders();
  }

  function StatusBadge({ status }) {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      preparing: "bg-blue-100 text-blue-700",
      ready: "bg-green-100 text-green-700",
      served: "bg-gray-200 text-gray-700",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          map[status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {status}
      </span>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* HEADER */}
      <div className="sticky top-0 bg-gray-50 pb-4 z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Order Queue Management
        </h1>
        <p className="text-sm text-gray-500">
          Manage orders, tokens & kitchen status
        </p>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map((o) => (
          <div key={o[0]} className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Order #{o[0]}</p>
              <StatusBadge status={o[2]} />
            </div>

            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>User: {o[1]}</p>
              <p>Total: {o[3]} BDT</p>
              <p>Payment: {o[4]}</p>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => generateToken(o[0])}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg"
              >
                Token
              </button>

              <button
                onClick={() => updateStatus(o[0], "preparing")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-2 rounded-lg"
              >
                Prep
              </button>

              <button
                onClick={() => updateStatus(o[0], "ready")}
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg"
              >
                Ready
              </button>

              <button
                onClick={() => updateStatus(o[0], "served")}
                className="bg-gray-700 hover:bg-gray-800 text-white text-sm py-2 rounded-lg"
              >
                Served
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block mt-4">
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o[0]} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-medium">#{o[0]}</td>
                  <td className="p-3">{o[1]}</td>
                  <td className="p-3">
                    <StatusBadge status={o[2]} />
                  </td>
                  <td className="p-3">{o[4]}</td>
                  <td className="p-3 font-semibold">{o[3]} BDT</td>

                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => generateToken(o[0])}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Token
                      </button>

                      <button
                        onClick={() => updateStatus(o[0], "preparing")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      >
                        Prep
                      </button>

                      <button
                        onClick={() => updateStatus(o[0], "ready")}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Ready
                      </button>

                      <button
                        onClick={() => updateStatus(o[0], "served")}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-2 py-1 rounded"
                      >
                        Done
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
