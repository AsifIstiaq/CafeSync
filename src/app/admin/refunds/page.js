"use client";

import { useEffect, useState } from "react";

export default function AdminRefunds() {
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      window.location.href = "/login";
    }

    fetchRefunds();
  }, []);

  async function fetchRefunds() {
    const res = await fetch("http://localhost:4000/api/refunds/admin/all");

    const data = await res.json();

    setRefunds(data.data || []);
  }

  async function updateRefund(id, status) {
    const res = await fetch(
      `http://localhost:4000/api/refunds/admin/update/${id}`,

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
      alert("Refund updated");

      fetchRefunds();
    } else {
      alert(data.message);
    }
  }

  return (
    <div
      className="
min-h-screen
bg-gray-50
p-4
md:p-6
"
    >
      <div className="mb-6">
        <h1
          className="
text-2xl
md:text-3xl
font-bold
text-orange-500
"
        >
          Refund Management
        </h1>

        <p
          className="
text-gray-500
text-sm
"
        >
          Review customer refund requests
        </p>
      </div>

      <div
        className="
bg-white
rounded-xl
border
shadow-sm
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
bg-gray-100
"
          >
            <tr>
              <th className="p-3 text-left">Refund ID</th>

              <th className="p-3 text-left">Order</th>

              <th className="p-3 text-left">Customer</th>

              <th className="p-3 text-left">Amount</th>

              <th className="p-3 text-left">Reason</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {refunds.map((refund, index) => (
              <tr
                key={index}
                className="
border-t
"
              >
                <td className="p-3">{refund[0]}</td>

                <td className="p-3">#{refund[1]}</td>

                <td className="p-3">{refund[2]}</td>

                <td className="p-3">{refund[3]} BDT</td>

                <td className="p-3">{refund[4]}</td>

                <td className="p-3">
                  <span
                    className={`
px-2
py-1
rounded-lg
text-xs

${
  refund[5] === "Pending"
    ? "bg-yellow-100 text-yellow-700"
    : refund[5] === "Approved"
      ? "bg-blue-100 text-blue-700"
      : refund[5] === "Completed"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
}

`}
                  >
                    {refund[5]}
                  </span>
                </td>

                <td className="p-3">
                  <div
                    className="
flex
gap-2
flex-wrap
"
                  >
                    <button
                      onClick={() => updateRefund(refund[0], "Approved")}
                      className="
bg-blue-500
hover:bg-blue-600
text-white
px-3
py-1
rounded-lg
text-xs
"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateRefund(refund[0], "Rejected")}
                      className="
bg-red-500
hover:bg-red-600
text-white
px-3
py-1
rounded-lg
text-xs
"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => updateRefund(refund[0], "Completed")}
                      className="
bg-green-500
hover:bg-green-600
text-white
px-3
py-1
rounded-lg
text-xs
"
                    >
                      Complete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {refunds.length === 0 && (
          <p
            className="
text-center
text-gray-500
py-10
"
          >
            No refund requests
          </p>
        )}
      </div>
    </div>
  );
}
