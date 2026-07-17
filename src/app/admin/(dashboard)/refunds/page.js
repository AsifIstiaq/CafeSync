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
md:justify-between
md:items-center
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
              Refund Management
            </h1>

            <p
              className="
text-orange-100
mt-2
"
            >
              Review and process customer refund requests
            </p>
          </div>

          <div
            className="
bg-white/20
rounded-2xl
px-6
py-4
backdrop-blur
"
          >
            <p
              className="
text-sm
text-orange-100
"
            >
              Total Requests
            </p>

            <h2
              className="
text-3xl
font-bold
"
            >
              {refunds.length}
            </h2>
          </div>
        </div>
      </div>

      {/* STATISTICS */}

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
          <p
            className="
text-gray-500
text-sm
"
          >
            Pending
          </p>

          <h2
            className="
text-3xl
font-bold
text-yellow-500
mt-2
"
          >
            {refunds.filter((r) => r[5] === "Pending").length}
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
          <p
            className="
text-gray-500
text-sm
"
          >
            Approved
          </p>

          <h2
            className="
text-3xl
font-bold
text-blue-500
mt-2
"
          >
            {refunds.filter((r) => r[5] === "Approved").length}
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
          <p
            className="
text-gray-500
text-sm
"
          >
            Completed
          </p>

          <h2
            className="
text-3xl
font-bold
text-green-500
mt-2
"
          >
            {refunds.filter((r) => r[5] === "Completed").length}
          </h2>
        </div>
      </div>

      {/* TABLE */}

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
            Refund Requests
          </h2>

          <p
            className="
text-sm
text-gray-500
mt-1
"
          >
            Manage customer refund approvals
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

                <th className="p-4 text-left">Order</th>

                <th className="p-4 text-left">Customer</th>

                <th className="p-4 text-left">Amount</th>

                <th className="p-4 text-left">Reason</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {refunds.map((refund, index) => {
                return (
                  <tr
                    key={index}
                    className="
border-t
hover:bg-slate-50
transition
"
                  >
                    <td
                      className="
p-4
font-medium
"
                    >
                      #{refund[0]}
                    </td>

                    <td
                      className="
p-4
"
                    >
                      #{refund[1]}
                    </td>

                    <td
                      className="
p-4
font-semibold
"
                    >
                      {refund[2]}
                    </td>

                    <td
                      className="
p-4
font-bold
text-orange-500
"
                    >
                      {refund[3]} BDT
                    </td>

                    <td
                      className="
p-4
text-gray-600
max-w-xs
"
                    >
                      {refund[4]}
                    </td>

                    <td className="p-4">
                      <span
                        className={`

px-3
py-1
rounded-full
text-xs
font-semibold

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

                    <td className="p-4">
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
py-2
rounded-xl
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
py-2
rounded-xl
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
py-2
rounded-xl
text-xs
"
                        >
                          Complete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
          {refunds.map((refund, index) => (
            <div
              key={index}
              className="
border
rounded-2xl
p-5
bg-white
shadow-sm
"
            >
              <div
                className="
flex
justify-between
"
              >
                <h3
                  className="
font-bold
text-gray-800
"
                >
                  Order #{refund[1]}
                </h3>

                <span
                  className="
text-xs
px-3
py-1
rounded-full
bg-gray-100
"
                >
                  {refund[5]}
                </span>
              </div>

              <p
                className="
mt-3
text-sm
text-gray-600
"
              >
                Customer:
                <b>{refund[2]}</b>
              </p>

              <p
                className="
text-orange-500
font-bold
mt-2
"
              >
                {refund[3]} BDT
              </p>

              <p
                className="
text-sm
text-gray-500
mt-2
"
              >
                {refund[4]}
              </p>

              <div
                className="
flex
gap-2
mt-4
"
              >
                <button
                  onClick={() => updateRefund(refund[0], "Approved")}
                  className="
flex-1
bg-blue-500
text-white
rounded-xl
py-2
text-xs
"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateRefund(refund[0], "Rejected")}
                  className="
flex-1
bg-red-500
text-white
rounded-xl
py-2
text-xs
"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

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
    </div>
  );
}
