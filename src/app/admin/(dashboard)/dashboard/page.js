"use client";

import { useEffect, useState } from "react";
import {
  ChefHat,
  CreditCard,
  Clock,
  CheckCircle,
  Utensils,
} from "lucide-react";

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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id,
        status,
      }),
    });

    fetchOrders();
  }

  async function updatePayment(order_id, status) {
    await fetch(`${API}/payment-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id,
        payment_status: status,
      }),
    });

    fetchOrders();
  }

  function StatusBadge({ status }) {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",

      preparing: "bg-blue-100 text-blue-700 border-blue-200",

      ready: "bg-green-100 text-green-700 border-green-200",

      served: "bg-gray-100 text-gray-700 border-gray-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {status}
      </span>
    );
  }

  const pending = orders.filter((o) => o[3] === "pending").length;

  const preparing = orders.filter((o) => o[3] === "preparing").length;

  const ready = orders.filter((o) => o[3] === "ready").length;

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      {/* HEADER */}

      <div
        className="
        bg-gradient-to-r 
        from-orange-500 
        to-red-500 
        rounded-3xl 
        p-6 
        text-white 
        shadow-lg
      "
      >
        <div className="flex items-center gap-3">
          <ChefHat size={40} />

          <div>
            <h1 className="text-3xl font-bold">Order Queue Dashboard</h1>

            <p className="opacity-90 mt-1">
              Manage food preparation, payments and tokens
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div
        className="
        grid 
        grid-cols-1 
        md:grid-cols-3 
        gap-5 
        mt-6
      "
      >
        <StatCard icon={<Clock />} title="Pending" value={pending} />

        <StatCard icon={<Utensils />} title="Preparing" value={preparing} />

        <StatCard icon={<CheckCircle />} title="Ready" value={ready} />
      </div>

      {/* TABLE */}

      <div
        className="
        mt-8
        bg-white
        rounded-3xl
        shadow
        overflow-hidden
        border
      "
      >
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">Current Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div
            className="
              p-10 
              text-center 
              text-gray-500
            "
          >
            No active orders
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  {[
                    "Order",
                    "Item",
                    "Customer",
                    "Status",
                    "Payment",
                    "Token",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="
          p-4
          text-left
          text-sm
          font-semibold
          text-gray-600
          "
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o[0]}
                    className="
          border-t
          hover:bg-orange-50
          transition
          "
                  >
                    <td className="p-4 font-semibold">#{o[0]}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Utensils size={16} />
                        {o[6]} × {o[7]}
                      </div>
                    </td>

                    <td className="p-4">{o[2]}</td>

                    <td className="p-4">
                      <StatusBadge status={o[3]} />
                    </td>

                    <td className="p-4">
                      <span
                        className={`
          px-3
          py-1
          rounded-full
          text-xs
          ${
            o[5] === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
          `}
                      >
                        {o[5]}
                      </span>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updatePayment(o[0], "paid")}
                          className="
          bg-green-600
          text-white
          px-3
          py-1
          rounded-lg
          text-xs
          "
                        >
                          Paid
                        </button>

                        <button
                          onClick={() => updatePayment(o[0], "unpaid")}
                          className="
          bg-red-500
          text-white
          px-3
          py-1
          rounded-lg
          text-xs
          "
                        >
                          Unpaid
                        </button>
                      </div>
                    </td>

                    <td className="p-4">
                      {o[9] ? (
                        <span
                          className="
          font-bold
          text-green-600
          "
                        >
                          T{String(o[9]).padStart(3, "0")}
                        </span>
                      ) : (
                        <button
                          onClick={() => generateToken(o[0])}
                          className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-xl
          text-sm
          "
                        >
                          Generate
                        </button>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <ActionButton
                          text="Prep"
                          color="yellow"
                          onClick={() => updateStatus(o[0], "preparing")}
                        />

                        <ActionButton
                          text="Ready"
                          color="green"
                          onClick={() => updateStatus(o[0], "ready")}
                        />

                        <ActionButton
                          text="Done"
                          color="gray"
                          onClick={() => updateStatus(o[0], "served")}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div
      className="
bg-white
rounded-3xl
p-5
shadow-sm
border
flex
items-center
gap-4
"
    >
      <div
        className="
bg-orange-100
p-3
rounded-xl
text-orange-600
"
      >
        {icon}
      </div>

      <div>
        <p className="text-gray-500 text-sm">{title}</p>

        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

function ActionButton({ text, color, onClick }) {
  const colors = {
    yellow: "bg-yellow-500",
    green: "bg-green-600",
    gray: "bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`
${colors[color]}
text-white
px-3
py-2
rounded-xl
text-xs
hover:opacity-90
`}
    >
      {text}
    </button>
  );
}
