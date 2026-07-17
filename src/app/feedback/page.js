"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [form, setForm] = useState({
    subject: "",
    message: "",
    rating: 5,
  });

  async function submitFeedback() {
    const res = await fetch(
      "http://localhost:4000/api/feedback/add",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user_id: 1,

          ...form,
        }),
      },
    );

    const data = await res.json();

    if (data.success) {
      alert("Feedback submitted");

      setForm({
        subject: "",
        message: "",
        rating: 5,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-5">Send Feedback</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) =>
            setForm({
              ...form,
              subject: e.target.value,
            })
          }
        />

        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({
              ...form,
              message: e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              rating: e.target.value,
            })
          }
        >
          <option value="5">5 ⭐</option>

          <option value="4">4 ⭐</option>

          <option value="3">3 ⭐</option>

          <option value="2">2 ⭐</option>

          <option value="1">1 ⭐</option>
        </select>

        <button
          onClick={submitFeedback}
          className="
mt-5
bg-orange-500
text-white
px-5
py-2
rounded
"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
