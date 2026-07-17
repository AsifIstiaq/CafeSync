"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const API = "http://localhost:4000/api/reservation";

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const table_id = searchParams.get("table");

  // Replace with logged in user later
  const user_id = 1;

  const [form, setForm] = useState({
    party_size: "",
    reserved_at: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.party_size || !form.reserved_at) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          table_id,
          party_size: Number(form.party_size),
          reserved_at: form.reserved_at,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Reservation submitted successfully!");
        router.push("/tables");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10">
      {/* Background Effects */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div
          className="
          w-full
          max-w-xl
          overflow-hidden
          rounded-3xl
          border
          bg-white/90
          shadow-2xl
          backdrop-blur-lg
          "
        >
          {/* Header */}

          <div
            className="
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            p-8
            text-white
            "
          >
            <div
              className="
            mb-4
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-white/20
            text-4xl
            "
            >
              🪑
            </div>

            <h1
              className="
            text-3xl
            font-extrabold
            md:text-4xl
            "
            >
              Reserve Table
            </h1>

            <p
              className="
            mt-3
            text-orange-100
            "
            >
              Book your table and enjoy a comfortable dining experience.
            </p>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="
            space-y-6
            p-8
            "
          >
            {/* Table */}

            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
                "
              >
                Selected Table
              </label>

              <div
                className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                bg-orange-50
                px-4
                py-3
                "
              >
                <span className="text-2xl">🪑</span>

                <input
                  value={table_id || ""}
                  readOnly
                  className="
                  w-full
                  bg-transparent
                  font-semibold
                  text-gray-700
                  outline-none
                  "
                />
              </div>
            </div>

            {/* Party Size */}

            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
                "
              >
                Number of Guests
              </label>

              <div className="relative">
                <span
                  className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-xl
                "
                >
                  👥
                </span>

                <input
                  type="number"
                  name="party_size"
                  min={1}
                  className="
                  w-full
                  rounded-2xl
                  border
                  py-3
                  pl-12
                  pr-4
                  outline-none
                  transition
                  focus:border-orange-500
                  focus:ring-4
                  focus:ring-orange-200
                  "
                  placeholder="Enter number of guests"
                  value={form.party_size}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Date */}

            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
                "
              >
                Reservation Date & Time
              </label>

              <div className="relative">
                <span
                  className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-xl
                "
                >
                  📅
                </span>

                <input
                  type="datetime-local"
                  name="reserved_at"
                  className="
                  w-full
                  rounded-2xl
                  border
                  py-3
                  pl-12
                  pr-4
                  outline-none
                  transition
                  focus:border-orange-500
                  focus:ring-4
                  focus:ring-orange-200
                  "
                  value={form.reserved_at}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Info Card */}

            <div
              className="
              rounded-2xl
              border
              border-orange-200
              bg-orange-50
              p-4
              "
            >
              <p
                className="
              text-sm
              text-orange-700
              "
              >
                🍽️ Your reservation will be reviewed and confirmed by the
                cafeteria system.
              </p>
            </div>

            {/* Button */}

            <button
              disabled={loading}
              className="
              w-full
              rounded-2xl
              bg-orange-500
              py-3.5
              font-bold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-orange-600
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-50
              "
            >
              {loading ? "Submitting Reservation..." : "Confirm Reservation ✓"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
