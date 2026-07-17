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
    return <div className="p-6">Loading subscriptions...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Subscription Management
        </h1>

        <div className="bg-white rounded-xl shadow border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
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
                <tr key={sub[0]} className="border-t hover:bg-gray-50">
                  <td className="p-4">{sub[0]}</td>

                  <td className="p-4 font-medium">{sub[1]}</td>

                  <td className="p-4 text-gray-500">{sub[2]}</td>

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

                  <td className="p-4">{sub[4]} BDT</td>

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
                    <div className="flex gap-2">
                      {sub[7] !== "Active" && (
                        <button
                          onClick={() => updateStatus(sub[0], "Active")}
                          className="
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      px-3
                      py-1
                      rounded
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
                      px-3
                      py-1
                      rounded
                      text-xs
                      "
                        >
                          Cancel
                        </button>
                      )}
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
