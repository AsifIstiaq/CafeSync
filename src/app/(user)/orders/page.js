"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(Cookies.get("user") || "{}");
  const user_id = user.id;

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

  async function cancelOrder(order) {
    const reason = prompt("Enter cancellation reason:");

    if (!reason) return;

    const res = await fetch("http://localhost:4000/api/refunds/request", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user_id,
        order_id: order[0],
        amount: order[2],
        reason,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Order cancelled. Refund request created.");
      fetchOrders();
    } else {
      alert(data.message);
    }
  }

  function formatToken(num) {
    if (!num) return "Not Assigned";

    return "T" + String(num).padStart(3, "0");
  }

  function statusBadge(status) {
    const map = {
      pending: {
        style: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: "⏳",
      },

      preparing: {
        style: "bg-blue-100 text-blue-700 border-blue-200",
        icon: "👨‍🍳",
      },

      ready: {
        style: "bg-green-100 text-green-700 border-green-200",
        icon: "✅",
      },

      served: {
        style: "bg-gray-100 text-gray-700 border-gray-200",
        icon: "🍽️",
      },

      cancelled: {
        style: "bg-red-100 text-red-700 border-red-200",
        icon: "❌",
      },
    };

    const current = map[status] || {
      style: "bg-gray-100 text-gray-700 border-gray-200",
      icon: "📦",
    };

    return (
      <span
        className={`
        inline-flex
        items-center
        gap-1
        rounded-full
        border
        px-4
        py-1.5
        text-xs
        font-semibold
        ${current.style}
        `}
      >
        {current.icon} {status}
      </span>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8">
      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />

      {/* Header */}

      <div className="relative z-10 mx-auto mb-8 max-w-5xl">
        <div
          className="
        rounded-3xl
        border
        bg-white/80
        p-6
        shadow-lg
        backdrop-blur
        "
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div
                className="
              mb-2
              inline-flex
              items-center
              rounded-full
              bg-orange-100
              px-4
              py-1.5
              text-sm
              font-medium
              text-orange-600
              "
              >
                🍴 CafeSync Orders
              </div>

              <h1
                className="
              text-3xl
              font-extrabold
              text-gray-800
              md:text-4xl
              "
              >
                My Orders
              </h1>

              <p className="mt-2 text-gray-500">
                Track your food preparation and delivery status in real time.
              </p>
            </div>

            <div
              className="
            rounded-2xl
            bg-orange-50
            px-6
            py-4
            text-center
            "
            >
              <p className="text-sm text-gray-500">Total Orders</p>

              <p
                className="
              text-3xl
              font-bold
              text-orange-500
              "
              >
                {orders.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}

      <div className="relative z-10 mx-auto max-w-5xl">
        {orders.length === 0 ? (
          <div
            className="
          rounded-3xl
          border
          bg-white
          p-12
          text-center
          shadow-md
          "
          >
            <div className="mb-4 text-6xl">🛒</div>

            <h2
              className="
            text-xl
            font-bold
            text-gray-800
            "
            >
              No Orders Found
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o) => (
              <div
                key={o[0]}
                className="
                group
                rounded-3xl
                border
                bg-white/90
                p-6
                shadow-md
                backdrop-blur
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                "
              >
                {/* Top Section */}

                <div
                  className="
                flex
                flex-col
                gap-5
                md:flex-row
                md:items-start
                md:justify-between
                "
                >
                  <div className="flex gap-4">
                    <div
                      className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-orange-100
                    text-3xl
                    "
                    >
                      🍛
                    </div>

                    <div>
                      <h2
                        className="
                      text-xl
                      font-bold
                      text-gray-800
                      "
                      >
                        Order #{o[0]}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {o[5]} × {o[6]}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Payment:
                        <span className="ml-1 font-semibold text-gray-700">
                          {o[3]}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                  rounded-2xl
                  bg-orange-50
                  px-5
                  py-3
                  text-center
                  "
                  >
                    <p className="text-xs text-gray-500">Token</p>

                    <p
                      className="
                    text-xl
                    font-extrabold
                    text-orange-500
                    "
                    >
                      {formatToken(o[4])}
                    </p>
                  </div>
                </div>

                <div className="my-6 border-t" />

                {/* Actions */}

                <div className="flex flex-wrap gap-3">
                  {o[3] === "Unpaid" && (
                    <button
                      onClick={async () => {
                        const res = await fetch(
                          `http://localhost:4000/api/payment/create/${o[0]}`,
                          {
                            method: "POST",
                          },
                        );

                        const data = await res.json();

                        if (data.success) {
                          alert("Payment successful.");
                          fetchOrders();
                        } else {
                          alert(data.message);
                        }
                      }}
                      className="
                      rounded-xl
                      bg-orange-500
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-md
                      transition
                      hover:bg-orange-600
                      hover:shadow-lg
                      "
                    >
                      💳 Pay Now
                    </button>
                  )}

                  {(o[1].toLowerCase() === "pending" ||
                    o[1].toLowerCase() === "received") && (
                    <button
                      onClick={() => cancelOrder(o)}
                      className="
                      rounded-xl
                      bg-red-500
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-red-600
                      "
                    >
                      Cancel Order
                    </button>
                  )}
                </div>

                {/* Bottom */}

                <div
                  className="
                mt-6
                flex
                flex-col
                gap-4
                border-t
                pt-5
                sm:flex-row
                sm:items-center
                sm:justify-between
                "
                >
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>

                    <p
                      className="
                    text-2xl
                    font-extrabold
                    text-gray-800
                    "
                    >
                      {o[2]} BDT
                    </p>
                  </div>

                  <div>{statusBadge(o[1].toLowerCase())}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
