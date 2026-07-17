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
font-bold

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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Reservation Management</h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-4">Reservation</th>

                <th>User</th>

                <th>Table</th>

                <th>Party</th>

                <th>Date & Time</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((r) => (
                <tr key={r[0]} className="border-b hover:bg-gray-50">
                  <td className="p-4">#{r[0]}</td>

                  <td>{r[1]}</td>

                  <td>Table {r[2]}</td>

                  <td>{r[3]} Persons</td>

                  <td>{new Date(r[4]).toLocaleString()}</td>

                  <td>
                    <Badge status={r[5]} />
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(r[0], "Approved")}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(r[0], "Rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
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
      </div>
    </div>
  );
}
