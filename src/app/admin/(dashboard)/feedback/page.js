"use client";

import { useEffect, useState } from "react";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      window.location.href = "/login";
      return;
    }

    fetchFeedbacks();
  }, []);

  async function fetchFeedbacks() {
    const res = await fetch("http://localhost:4000/api/feedback/admin/all");

    const data = await res.json();

    if (data.success) {
      setFeedbacks(data.data);
    }
  }

  async function updateStatus(id, status) {
    const res = await fetch(
      `http://localhost:4000/api/feedback/admin/status/${id}`,
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
      alert("Feedback updated");
      fetchFeedbacks();
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      {/* Header */}

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">
              Customer Feedback
            </h1>

            <p className="mt-2 text-orange-100">
              View and manage customer feedback.
            </p>
          </div>

          <div className="rounded-2xl bg-white/20 px-6 py-4 backdrop-blur">
            <p className="text-sm text-orange-100">Total Feedback</p>

            <h2 className="text-3xl font-bold">{feedbacks.length}</h2>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="mb-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-500">
            {feedbacks.filter((f) => f[6] === "Pending").length}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Reviewed</p>

          <h2 className="mt-2 text-3xl font-bold text-blue-500">
            {feedbacks.filter((f) => f[6] === "Reviewed").length}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Resolved</p>

          <h2 className="mt-2 text-3xl font-bold text-green-500">
            {feedbacks.filter((f) => f[6] === "Resolved").length}
          </h2>
        </div>
      </div>

      {/* Desktop */}

      <div className="hidden overflow-hidden rounded-3xl border bg-white shadow-sm lg:block">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Subject</th>

              <th className="p-4 text-left">Message</th>

              <th className="p-4 text-left">Rating</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((f) => (
              <tr key={f[0]} className="border-t hover:bg-slate-50">
                <td className="p-4 font-semibold">#{f[0]}</td>

                <td className="p-4">{f[1]}</td>

                <td className="p-4">{f[2]}</td>

                <td className="p-4 font-medium">{f[3]}</td>

                <td className="max-w-xs p-4 text-gray-600">{f[4]}</td>

                <td className="p-4 text-orange-500 font-bold">
                  {"⭐".repeat(f[5])}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold

                    ${
                      f[6] === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : f[6] === "Reviewed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                    }

                    `}
                  >
                    {f[6]}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(f[0], "Reviewed")}
                      className="rounded-xl bg-blue-500 px-3 py-2 text-xs text-white hover:bg-blue-600"
                    >
                      Review
                    </button>

                    <button
                      onClick={() => updateStatus(f[0], "Resolved")}
                      className="rounded-xl bg-green-500 px-3 py-2 text-xs text-white hover:bg-green-600"
                    >
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="space-y-5 lg:hidden">
        {feedbacks.map((f) => (
          <div key={f[0]} className="rounded-3xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{f[1]}</h3>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
                {f[6]}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">{f[2]}</p>

            <h4 className="mt-4 font-semibold">{f[3]}</h4>

            <p className="mt-2 text-gray-600">{f[4]}</p>

            <p className="mt-3 font-bold text-orange-500">
              {"⭐".repeat(f[5])}
            </p>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => updateStatus(f[0], "Reviewed")}
                className="flex-1 rounded-xl bg-blue-500 py-2 text-white"
              >
                Review
              </button>

              <button
                onClick={() => updateStatus(f[0], "Resolved")}
                className="flex-1 rounded-xl bg-green-500 py-2 text-white"
              >
                Resolve
              </button>
            </div>
          </div>
        ))}

        {feedbacks.length === 0 && (
          <div className="rounded-3xl border bg-white p-10 text-center">
            <div className="text-5xl">💬</div>

            <h3 className="mt-4 font-bold">No Feedback Yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}
