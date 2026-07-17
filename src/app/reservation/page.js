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
        if (data.success) {
          alert("Reservation submitted successfully");

          router.push("/tables");
        } else {
          alert(data.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden">
        {/* Header */}

        <div className="bg-orange-500 p-8 text-white">
          <h1 className="text-3xl font-bold">Reserve Table</h1>

          <p className="mt-2 text-orange-100">
            Complete the reservation details.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Table Number</label>

            <input
              value={table_id}
              readOnly
              className="w-full border rounded-xl p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Party Size</label>

            <input
              type="number"
              name="party_size"
              min={1}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Number of Guests"
              value={form.party_size}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Reservation Date & Time
            </label>

            <input
              type="datetime-local"
              name="reserved_at"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
              value={form.reserved_at}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Reserve Table"}
          </button>
        </form>
      </div>
    </div>
  );
}
