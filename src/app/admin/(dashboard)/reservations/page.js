"use client";

import { useEffect, useState } from "react";

const API = "http://localhost:4000/api/reservation";

export default function ReservationDashboard() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    const res = await fetch(`${API}/admin`);

    const data = await res.json();

    if (data.success) {
      setReservations(data.data);
    }
  }

  async function updateStatus(id, status) {
    await fetch(`${API}/status`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        reservation_id: id,
        status,
      }),
    });

    fetchReservations();
  }

  function Badge({ status }) {
    return (
      <span
        className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold

      ${
        status === "Approved"
          ? "bg-green-100 text-green-700"
          : status === "Rejected"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
      }

      `}
      >
        {status}
      </span>
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
shadow-lg
text-white
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
              Reservation Management
            </h1>

            <p
              className="
mt-2
text-orange-100
"
            >
              Manage customer table booking requests
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
              Total Reservations
            </p>

            <h2
              className="
text-3xl
font-bold
"
            >
              {reservations.length}
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
border
rounded-2xl
p-5
shadow-sm
"
        >
          <p className="text-gray-500 text-sm">Pending</p>

          <h2
            className="
text-3xl
font-bold
text-yellow-500
mt-2
"
          >
            {reservations.filter((r) => r[5] === "Pending").length}
          </h2>
        </div>

        <div
          className="
bg-white
border
rounded-2xl
p-5
shadow-sm
"
        >
          <p className="text-gray-500 text-sm">Approved</p>

          <h2
            className="
text-3xl
font-bold
text-green-500
mt-2
"
          >
            {reservations.filter((r) => r[5] === "Approved").length}
          </h2>
        </div>

        <div
          className="
bg-white
border
rounded-2xl
p-5
shadow-sm
"
        >
          <p className="text-gray-500 text-sm">Rejected</p>

          <h2
            className="
text-3xl
font-bold
text-red-500
mt-2
"
          >
            {reservations.filter((r) => r[5] === "Rejected").length}
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
            Reservation Requests
          </h2>

          <p
            className="
text-sm
text-gray-500
mt-1
"
          >
            Review and manage customer bookings
          </p>
        </div>

        {/* DESKTOP TABLE */}

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

                <th className="p-4 text-left">Table</th>

                <th className="p-4 text-left">Party Size</th>

                <th className="p-4 text-left">Date & Time</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((r) => (
                <tr
                  key={r[0]}
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
                    #{r[0]}
                  </td>

                  <td
                    className="
p-4
font-medium
"
                  >
                    {r[1]}
                  </td>

                  <td
                    className="
p-4
"
                  >
                    <span
                      className="
bg-orange-100
text-orange-600
px-3
py-1
rounded-full
text-xs
font-semibold
"
                    >
                      Table {r[2]}
                    </span>
                  </td>

                  <td
                    className="
p-4
"
                  >
                    {r[3]} Persons
                  </td>

                  <td
                    className="
p-4
text-gray-500
"
                  >
                    {new Date(r[4]).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <Badge status={r[5]} />
                  </td>

                  <td className="p-4">
                    <div
                      className="
flex
gap-2
"
                    >
                      <button
                        onClick={() => updateStatus(r[0], "Approved")}
                        className="
bg-green-500
hover:bg-green-600
text-white
px-4
py-2
rounded-xl
text-xs
font-medium
"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(r[0], "Rejected")}
                        className="
bg-red-500
hover:bg-red-600
text-white
px-4
py-2
rounded-xl
text-xs
font-medium
"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}

        <div
          className="
md:hidden
p-5
space-y-4
"
        >
          {reservations.map((r) => (
            <div
              key={r[0]}
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
items-center
"
              >
                <h3
                  className="
font-bold
text-gray-800
"
                >
                  Reservation #{r[0]}
                </h3>

                <Badge status={r[5]} />
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
                  <b> {r[1]}</b>
                </p>

                <p>
                  Table:
                  <b> {r[2]}</b>
                </p>

                <p>
                  Guests:
                  <b> {r[3]} Persons</b>
                </p>

                <p>{new Date(r[4]).toLocaleString()}</p>
              </div>

              <div
                className="
flex
gap-3
mt-5
"
              >
                <button
                  onClick={() => updateStatus(r[0], "Approved")}
                  className="
flex-1
bg-green-500
text-white
rounded-xl
py-2
text-sm
"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(r[0], "Rejected")}
                  className="
flex-1
bg-red-500
text-white
rounded-xl
py-2
text-sm
"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

          {reservations.length === 0 && (
            <div
              className="
text-center
py-12
text-gray-500
"
            >
              No reservation requests found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
