"use client";

import { useEffect, useState } from "react";
import TableGrid from "./components/TableGrid";

const API = "http://localhost:4000/api/reservation";

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTables();
  }, []);

  async function fetchTables() {
    try {
      const res = await fetch(`${API}/tables`);
      const data = await res.json();

      if (data.success) {
        setTables(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      {/* Hero Header */}

      <section
        className="
        relative
        z-10
        overflow-hidden
        bg-gradient-to-r
        from-orange-500
        to-orange-600
        text-white
        shadow-xl
        "
      >
        <div
          className="
          absolute
          right-0
          top-0
          h-72
          w-72
          rounded-full
          bg-white/10
          blur-2xl
          "
        />

        <div
          className="
          relative
          mx-auto
          max-w-7xl
          px-6
          py-12
          md:px-10
          "
        >
          <div className="flex items-center gap-5">
            <div
              className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-white/20
              text-5xl
              backdrop-blur
              "
            >
              🪑
            </div>

            <div>
              <h1
                className="
                text-4xl
                font-extrabold
                md:text-5xl
                "
              >
                Reserve a Table
              </h1>

              <p
                className="
                mt-3
                max-w-xl
                text-orange-100
                text-lg
                "
              >
                Choose your preferred table and enjoy a comfortable dining
                experience at CafeSync.
              </p>
            </div>
          </div>

          {/* Info Cards */}

          <div
            className="
            mt-10
            grid
            gap-4
            sm:grid-cols-3
            "
          >
            <div
              className="
              rounded-2xl
              bg-white/10
              p-4
              backdrop-blur
              "
            >
              <p className="text-2xl">🍽️</p>

              <p className="mt-2 font-semibold">Available Tables</p>

              <p className="text-sm text-orange-100">
                Pick the best spot for your meal
              </p>
            </div>

            <div
              className="
              rounded-2xl
              bg-white/10
              p-4
              backdrop-blur
              "
            >
              <p className="text-2xl">⚡</p>

              <p className="mt-2 font-semibold">Quick Booking</p>

              <p className="text-sm text-orange-100">
                Reserve your table instantly
              </p>
            </div>

            <div
              className="
              rounded-2xl
              bg-white/10
              p-4
              backdrop-blur
              "
            >
              <p className="text-2xl">✅</p>

              <p className="mt-2 font-semibold">Easy Management</p>

              <p className="text-sm text-orange-100">
                Track your reservations easily
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Table Section */}

      <main
        className="
        relative
        z-10
        mx-auto
        max-w-7xl
        px-6
        py-10
        md:px-10
        "
      >
        <div className="mb-8">
          <h2
            className="
            text-2xl
            font-extrabold
            text-gray-800
            "
          >
            Choose Your Table
          </h2>

          <p className="mt-2 text-gray-500">
            Select an available table to continue with your reservation.
          </p>
        </div>

        {loading ? (
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

              <p className="font-medium text-gray-500">Loading tables...</p>
            </div>
          </div>
        ) : (
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
            <TableGrid tables={tables} />
          </div>
        )}
      </main>
    </div>
  );
}
