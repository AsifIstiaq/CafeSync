"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ReviewPage() {
  const params = useParams();

  const item_id = params.item_id;

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const user_id = 1;

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const res = await fetch(
      `http://localhost:4000/api/reviews/item/${item_id}`,
    );

    const data = await res.json();

    if (data.success) setReviews(data.data);
  }

  async function submitReview() {
    const res = await fetch("http://localhost:4000/api/reviews/add", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user_id,
        item_id,
        rating: Number(rating),
        comment,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Review submitted");

      setComment("");

      fetchReviews();
    }
  }

  function ratingText(value) {
    const ratings = {
      5: "Excellent",
      4: "Very Good",
      3: "Good",
      2: "Average",
      1: "Poor",
    };

    return ratings[value];
  }

  return (
    <div className="relative min-h-screen overflow-hidden p-6">
      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}

        <div
          className="
          mb-8
          rounded-3xl
          border
          bg-white/80
          p-6
          shadow-lg
          backdrop-blur-lg
          "
        >
          <div className="flex items-center gap-5">
            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-orange-100
              text-4xl
              "
            >
              ⭐
            </div>

            <div>
              <h1
                className="
                text-3xl
                font-extrabold
                text-gray-800
                md:text-4xl
                "
              >
                Food Reviews
              </h1>

              <p className="mt-1 text-gray-500">
                Share your experience and read customer feedback.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Review Form */}

          <div
            className="
            rounded-3xl
            border
            bg-white
            p-7
            shadow-md
            "
          >
            <h2
              className="
              text-xl
              font-bold
              text-gray-800
              "
            >
              Write a Review
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Rate this food item and tell others about your experience.
            </p>

            <div className="mt-6">
              <label
                className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
                "
              >
                Your Rating
              </label>

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="
                w-full
                rounded-2xl
                border
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-orange-500
                focus:ring-4
                focus:ring-orange-200
                "
              >
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>

                <option value="4">⭐⭐⭐⭐ Very Good</option>

                <option value="3">⭐⭐⭐ Good</option>

                <option value="2">⭐⭐ Average</option>

                <option value="1">⭐ Poor</option>
              </select>
            </div>

            <div className="mt-5">
              <label
                className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
                "
              >
                Comment
              </label>

              <textarea
                rows={5}
                className="
                w-full
                resize-none
                rounded-2xl
                border
                p-4
                outline-none
                transition
                focus:border-orange-500
                focus:ring-4
                focus:ring-orange-200
                "
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div
              className="
              mt-5
              rounded-2xl
              bg-orange-50
              p-4
              "
            >
              <p className="text-sm text-orange-700">
                Current Rating:
                <span className="ml-2 font-bold">{ratingText(rating)}</span>
              </p>
            </div>

            <button
              onClick={submitReview}
              className="
              mt-6
              w-full
              rounded-2xl
              bg-orange-500
              py-3
              font-bold
              text-white
              shadow-md
              transition
              hover:bg-orange-600
              hover:shadow-lg
              "
            >
              Submit Review 🚀
            </button>
          </div>

          {/* Reviews */}

          <div>
            <div
              className="
              mb-5
              rounded-3xl
              border
              bg-white
              p-6
              shadow-md
              "
            >
              <h2
                className="
                text-xl
                font-bold
                text-gray-800
                "
              >
                Customer Reviews
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                See what other customers think.
              </p>
            </div>

            <div className="space-y-4">
              {reviews.length === 0 && (
                <div
                  className="
                  rounded-3xl
                  border
                  bg-white
                  p-10
                  text-center
                  shadow-md
                  "
                >
                  <div className="text-5xl">💬</div>

                  <h3
                    className="
                  mt-4
                  font-bold
                  text-gray-800
                  "
                  >
                    No Reviews Yet
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Be the first person to review this item.
                  </p>
                </div>
              )}

              {reviews.map((r) => (
                <div
                  key={r[0]}
                  className="
                  rounded-3xl
                  border
                  bg-white
                  p-5
                  shadow-md
                  transition
                  hover:shadow-lg
                  "
                >
                  <div
                    className="
                  flex
                  items-center
                  justify-between
                  "
                  >
                    <h3
                      className="
                      font-bold
                      text-gray-800
                      "
                    >
                      {r[1]}
                    </h3>

                    <span
                      className="
                      rounded-full
                      bg-orange-100
                      px-3
                      py-1
                      text-sm
                      font-semibold
                      text-orange-600
                      "
                    >
                      {"⭐".repeat(r[2])}
                    </span>
                  </div>

                  <p
                    className="
                  mt-4
                  text-gray-600
                  leading-6
                  "
                  >
                    {r[3]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
