"use client";

import { useEffect, useState } from "react";
import ReservationBadge from "@/components/ReservationBadge";
import Cookies from "js-cookie";

const API = "http://localhost:4000/api/reservation";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(Cookies.get("user") || "{}");
  const user_id = user.id;

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      const res = await fetch(`${API}/my/${user_id}`);

      const data = await res.json();

      if (data.success) {
        setReservations(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      px-5
      py-10
      "
    >
      {/* Background Decorations */}

      <div
        className="
        absolute
        -left-32
        -top-32
        h-96
        w-96
        rounded-full
        bg-orange-300/30
        blur-3xl
        "
      />

      <div
        className="
        absolute
        -bottom-32
        -right-32
        h-96
        w-96
        rounded-full
        bg-orange-200/40
        blur-3xl
        "
      />

      <div
        className="
        relative
        z-10
        mx-auto
        max-w-6xl
        "
      >
        {/* Header */}

        <div
          className="
          mb-10
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
          "
        >
          <div>
            <div
              className="
              flex
              items-center
              gap-3
              "
            >
              <div
                className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-orange-500
                text-3xl
                shadow-lg
                "
              >
                🪑
              </div>

              <h1
                className="
                text-3xl
                font-extrabold
                text-gray-800
                md:text-4xl
                "
              >
                My Reservations
              </h1>
            </div>

            <p
              className="
              mt-3
              text-gray-500
              "
            >
              Manage and track your cafe table reservations.
            </p>
          </div>

          <div
            className="
            rounded-2xl
            bg-white
            px-5
            py-3
            shadow-md
            border
            "
          >
            <p className="text-sm text-gray-500">Total Reservations</p>

            <p
              className="
              text-2xl
              font-bold
              text-orange-500
              "
            >
              {reservations.length}
            </p>
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div
            className="
            flex
            min-h-[300px]
            items-center
            justify-center
            rounded-3xl
            border
            bg-white
            shadow-md
            "
          >
            <div className="text-center">
              <div
                className="
                mx-auto
                mb-4
                h-12
                w-12
                animate-spin
                rounded-full
                border-4
                border-orange-200
                border-t-orange-500
                "
              />

              <p className="text-gray-500">Loading reservations...</p>
            </div>
          </div>
        )}

        {/* Empty State */}

        {!loading && reservations.length === 0 && (
          <div
            className="
            rounded-3xl
            border
            bg-white
            p-10
            text-center
            shadow-lg
            "
          >
            <div className="text-6xl">📅</div>

            <h2
              className="
              mt-4
              text-xl
              font-bold
              text-gray-800
              "
            >
              No Reservations Found
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't reserved any table yet.
            </p>
          </div>
        )}

        {/* Reservation Cards */}

        {!loading && reservations.length > 0 && (
          <div
            className="
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
            "
          >
            {reservations.map((r) => (
              <div
                key={r[0]}
                className="
                group
                overflow-hidden
                rounded-3xl
                border
                bg-white
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                "
              >
                {/* Card Header */}

                <div
                  className="
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-600
                  p-5
                  text-white
                  "
                >
                  <div
                    className="
                    flex
                    items-center
                    justify-between
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

                    <span className="text-3xl">🪑</span>
                  </div>
                </div>

                {/* Details */}

                <div className="space-y-4 p-6">
                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    bg-orange-50
                    p-3
                    "
                  >
                    <span className="text-gray-600">Table</span>

                    <span className="font-bold text-gray-800">#{r[1]}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Guests</span>

                    <span className="font-semibold">👥 {r[3]} Persons</span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Reservation Date</p>

                    <p
                      className="
                      mt-1
                      font-semibold
                      text-gray-800
                      "
                    >
                      📅 {new Date(r[2]).toLocaleString()}
                    </p>
                  </div>

                  <div className="pt-2">
                    <ReservationBadge status={r[4]} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
