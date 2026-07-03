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

  // TOKEN GENERATE
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

  // STATUS UPDATE
  async function updateStatus(order_id, status) {
    await fetch(`${API}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id, status }),
    });

    fetchOrders();
  }

  // PAYMENT UPDATE
  async function updatePayment(order_id, status) {
    await fetch(`${API}/payment-status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id, payment_status: status }),
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
      <span className={`px-2 py-1 rounded-full text-xs ${map[status]}`}>
        {status}
      </span>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* HEADER */}
      <div className="sticky top-0 bg-gray-50 pb-4 z-10">
        <h1 className="text-2xl font-bold">Order Queue Management</h1>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden mt-4">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Token</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => {
              const tokenExists = o[8] !== null;

              return (
                <tr key={o[0]} className="border-t">
                  <td className="p-3">#{o[0]}</td>

                  <td className="p-3">
                    {o[5]} × {o[6]}
                  </td>

                  <td className="p-3">{o[1]}</td>

                  <td className="p-3">
                    <StatusBadge status={o[2]} />
                  </td>

                  {/* PAYMENT STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        o[4] === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {o[4]}
                    </span>

                    {/* CHANGE PAYMENT */}
                    <div className="mt-1 flex gap-1">
                      <button
                        onClick={() => updatePayment(o[0], "paid")}
                        className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Mark Paid
                      </button>

                      <button
                        onClick={() => updatePayment(o[0], "unpaid")}
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Unpaid
                      </button>
                    </div>
                  </td>

                  {/* TOKEN */}
                  <td className="p-3">
                    {o[8] ? (
                      <span className="text-green-600 font-semibold">
                        T{String(o[8]).padStart(3, "0")}
                      </span>
                    ) : (
                      <button
                        onClick={() => generateToken(o[0])}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Generate
                      </button>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => updateStatus(o[0], "preparing")}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Prep
                    </button>

                    <button
                      onClick={() => updateStatus(o[0], "ready")}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Ready
                    </button>

                    <button
                      onClick={() => updateStatus(o[0], "served")}
                      className="bg-gray-700 text-white px-2 py-1 rounded"
                    >
                      Done
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
