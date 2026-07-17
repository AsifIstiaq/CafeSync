"use client";

import { useEffect, useState } from "react";

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  async function fetchSubscriptions() {
    try {
      const res = await fetch(
        "http://localhost:4000/api/subscriptions/admin/all",
      );

      const data = await res.json();

      if (data.success) {
        setSubscriptions(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(sub_id, status) {
    const res = await fetch(
      `http://localhost:4000/api/subscriptions/admin/status/${sub_id}`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      },
    );

    const data = await res.json();

    if (data.success) {
      alert("Subscription status updated");

      fetchSubscriptions();
    } else {
      alert(data.message);
    }
  }

  function statusStyle(status) {
    if (status === "Active") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Expired") {
      return "bg-gray-200 text-gray-700";
    }

    return "bg-yellow-100 text-yellow-700";
  }

  if (loading) {
    return (
      <div
        className="
      min-h-screen
      bg-slate-50
      flex
      items-center
      justify-center
      "
      >
        <p
          className="
        text-gray-500
        animate-pulse
        "
        >
          Loading subscriptions...
        </p>
      </div>
    );
  }

  return (
    <div
      className="
min-h-screen
bg-slate-50
p-5
md:p-8
"
    >
      {/* HEADER */}

      <div
        className="
bg-gradient-to-r
from-orange-500
to-red-500
rounded-3xl
p-6
md:p-8
text-white
shadow-lg
mb-8
"
      >
        <div
          className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-5
"
        >
          <div>
            <h1
              className="
text-3xl
md:text-4xl
font-bold
"
            >
              Subscription Management
            </h1>

            <p
              className="
text-orange-100
mt-2
"
            >
              Manage customer membership plans and subscriptions
            </p>
          </div>

          <div
            className="
bg-white/20
backdrop-blur
rounded-2xl
px-6
py-4
"
          >
            <p
              className="
text-sm
text-orange-100
"
            >
              Total Subscribers
            </p>

            <h2
              className="
text-3xl
font-bold
"
            >
              {subscriptions.length}
            </h2>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-3
gap-5
mb-8
"
      >
        <div
          className="
bg-white
rounded-2xl
border
shadow-sm
p-5
"
        >
          <p className="text-gray-500 text-sm">Active Plans</p>

          <h2
            className="
text-3xl
font-bold
text-green-500
mt-2
"
          >
            {subscriptions.filter((s) => s[7] === "Active").length}
          </h2>
        </div>

        <div
          className="
bg-white
rounded-2xl
border
shadow-sm
p-5
"
        >
          <p className="text-gray-500 text-sm">Cancelled</p>

          <h2
            className="
text-3xl
font-bold
text-red-500
mt-2
"
          >
            {subscriptions.filter((s) => s[7] === "Cancelled").length}
          </h2>
        </div>

        <div
          className="
bg-white
rounded-2xl
border
shadow-sm
p-5
"
        >
          <p className="text-gray-500 text-sm">Expired</p>

          <h2
            className="
text-3xl
font-bold
text-gray-500
mt-2
"
          >
            {subscriptions.filter((s) => s[7] === "Expired").length}
          </h2>
        </div>
      </div>

      {/* TABLE CARD */}

      <div
        className="
bg-white
rounded-3xl
border
shadow-sm
overflow-hidden
"
      >
        <div
          className="
px-6
py-5
border-b
"
        >
          <h2
            className="
text-xl
font-bold
text-gray-800
"
          >
            Customer Subscriptions
          </h2>

          <p
            className="
text-sm
text-gray-500
mt-1
"
          >
            Track plans, billing period and subscription status
          </p>
        </div>

        <div
          className="
hidden
md:block
overflow-x-auto
"
        >
          <table
            className="
w-full
text-sm
"
          >
            <thead
              className="
bg-slate-100
text-gray-600
uppercase
text-xs
"
            >
              <tr>
                <th className="p-4 text-left">ID</th>

                <th className="p-4 text-left">Customer</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Plan</th>

                <th className="p-4 text-left">Price</th>

                <th className="p-4 text-left">Start</th>

                <th className="p-4 text-left">End</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.map((sub) => (
                <tr
                  key={sub[0]}
                  className="
border-t
hover:bg-slate-50
transition
"
                >
                  <td
                    className="
p-4
font-semibold
"
                  >
                    #{sub[0]}
                  </td>

                  <td
                    className="
p-4
font-medium
"
                  >
                    {sub[1]}
                  </td>

                  <td
                    className="
p-4
text-gray-500
"
                  >
                    {sub[2]}
                  </td>

                  <td className="p-4">
                    <span
                      className="
px-3
py-1
rounded-full
bg-orange-100
text-orange-600
text-xs
font-semibold
"
                    >
                      {sub[3]}
                    </span>
                  </td>

                  <td
                    className="
p-4
font-semibold
"
                  >
                    {sub[4]} BDT
                  </td>

                  <td className="p-4">
                    {new Date(sub[5]).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {new Date(sub[6]).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`
px-3
py-1
rounded-full
text-xs
font-semibold

${statusStyle(sub[7])}

`}
                    >
                      {sub[7]}
                    </span>
                  </td>

                  <td className="p-4">
                    {sub[7] !== "Active" && (
                      <button
                        onClick={() => updateStatus(sub[0], "Active")}
                        className="
bg-green-600
hover:bg-green-700
text-white
px-4
py-2
rounded-xl
text-xs
"
                      >
                        Activate
                      </button>
                    )}

                    {sub[7] === "Active" && (
                      <button
                        onClick={() => updateStatus(sub[0], "Cancelled")}
                        className="
bg-red-500
hover:bg-red-600
text-white
px-4
py-2
rounded-xl
text-xs
"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW */}

        <div
          className="
md:hidden
p-5
space-y-4
"
        >
          {subscriptions.map((sub) => (
            <div
              key={sub[0]}
              className="
border
rounded-2xl
p-5
shadow-sm
bg-white
"
            >
              <div
                className="
flex
justify-between
items-center
"
              >
                <h3
                  className="
font-bold
text-gray-800
"
                >
                  {sub[3]}
                </h3>

                <span
                  className={`
px-3
py-1
rounded-full
text-xs
font-semibold

${statusStyle(sub[7])}

`}
                >
                  {sub[7]}
                </span>
              </div>

              <div
                className="
mt-4
space-y-2
text-sm
text-gray-600
"
              >
                <p>
                  Customer:
                  <b> {sub[1]}</b>
                </p>

                <p>
                  Email:
                  {sub[2]}
                </p>

                <p>
                  Price:
                  <b>{sub[4]} BDT</b>
                </p>

                <p>
                  Period:
                  {new Date(sub[5]).toLocaleDateString()}-
                  {new Date(sub[6]).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-5">
                {sub[7] !== "Active" ? (
                  <button
                    onClick={() => updateStatus(sub[0], "Active")}
                    className="
w-full
bg-green-600
text-white
rounded-xl
py-2
"
                  >
                    Activate Subscription
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatus(sub[0], "Cancelled")}
                    className="
w-full
bg-red-500
text-white
rounded-xl
py-2
"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          ))}

          {subscriptions.length === 0 && (
            <p
              className="
text-center
text-gray-500
py-10
"
            >
              No subscriptions found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
