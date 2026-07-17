"use client";

import { useEffect, useState } from "react";
import ReservationBadge from "../components/ReservationBadge";

const API = "http://localhost:4000/api/reservation";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  const user_id = 1;

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    const res = await fetch(`${API}/my/${user_id}`);

    const data = await res.json();

    if (data.success) {
      setReservations(data.data);
    }
  }

  return (
    <div
      className="
min-h-screen
bg-gray-100
p-6
"
    >
      <div
        className="
max-w-6xl
mx-auto
"
      >
        <h1
          className="
text-3xl
font-bold
mb-8
"
        >
          My Reservations
        </h1>

        <div
          className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6
"
        >
          {reservations.map((r) => (
            <div
              key={r[0]}
              className="
bg-white
rounded-2xl
shadow
p-6
border
"
            >
              <h2
                className="
text-xl
font-bold
"
              >
                Reservation #{r[0]}
              </h2>

              <div className="mt-4 space-y-2">
                <p>
                  Table:
                  <b>{r[1]}</b>
                </p>

                <p>
                  Guests:
                  <b>{r[3]}</b>
                </p>

                <p>
                  Date:
                  <br />
                  <b>{new Date(r[2]).toLocaleString()}</b>
                </p>
              </div>

              <div className="mt-4">
                <ReservationBadge status={r[4]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
