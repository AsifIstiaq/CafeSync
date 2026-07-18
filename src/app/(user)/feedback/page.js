"use client";
import Cookies from "js-cookie";

import { useState } from "react";

export default function FeedbackPage() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const user_id = user.id;

  const [form, setForm] = useState({
    subject: "",
    message: "",
    rating: 5,
  });

  async function submitFeedback() {
    const res = await fetch("http://localhost:4000/api/feedback/add", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user_id: user_id,
        ...form,
      }),
    });

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
    <div className="relative min-h-screen overflow-hidden p-6">
      {/* Background Decoration */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl" />
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
              💬
            </div>

            <h1
              className="
              text-3xl
              font-extrabold
              "
            >
              Send Feedback
            </h1>

            <p
              className="
            mt-2
            text-orange-100
            "
            >
              Help us improve your CafeSync experience.
            </p>
          </div>

          {/* Form */}

          <div className="space-y-6 p-8">
            {/* Subject */}

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
                Subject
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
                  📝
                </span>

                <input
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
                  placeholder="Enter feedback subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Message */}

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
                Message
              </label>

              <textarea
                rows={5}
                className="
                w-full
                rounded-2xl
                border
                p-4
                outline-none
                transition
                resize-none
                focus:border-orange-500
                focus:ring-4
                focus:ring-orange-200
                "
                placeholder="Write your feedback here..."
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />
            </div>

            {/* Rating */}

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
                Rate Your Experience
              </label>

              <div
                className="
                rounded-2xl
                bg-orange-50
                p-4
                "
              >
                <select
                  className="
                  w-full
                  rounded-xl
                  border
                  bg-white
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                  focus:ring-4
                  focus:ring-orange-200
                  "
                  value={form.rating}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rating: e.target.value,
                    })
                  }
                >
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>

                  <option value="4">⭐⭐⭐⭐ Very Good</option>

                  <option value="3">⭐⭐⭐ Good</option>

                  <option value="2">⭐⭐ Average</option>

                  <option value="1">⭐ Poor</option>
                </select>
              </div>
            </div>

            {/* Preview */}

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
                ⭐ Your rating:
                <span className="ml-2 font-bold">{form.rating}/5</span>
              </p>
            </div>

            {/* Submit */}

            <button
              onClick={submitFeedback}
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
              "
            >
              Submit Feedback 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
