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
    const payload = {
      user_id,
      item_id,
      rating: Number(rating),
      comment,
    };

    console.log("Sending:", payload);

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

    console.log("Backend response:", data);

    if (data.success) {
      alert("Review submitted");

      setComment("");

      fetchReviews();
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Food Reviews</h1>

      <div className="bg-white shadow p-5 rounded-xl">
        <h2>Your Rating</h2>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 mt-2"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>

          <option value="4">⭐⭐⭐⭐</option>

          <option value="3">⭐⭐⭐</option>

          <option value="2">⭐⭐</option>

          <option value="1">⭐</option>
        </select>

        <textarea
          className="border w-full mt-3 p-2"
          placeholder="Write your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submitReview}
          className="
bg-orange-500
text-white
px-5
py-2
rounded-lg
mt-3
"
        >
          Submit Review
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>

        {reviews.map((r) => (
          <div key={r[0]} className="bg-gray-100 p-4 mt-3 rounded">
            <h3 className="font-semibold">{r[1]}</h3>

            <p>
              Rating:
              {"⭐".repeat(r[2])}
            </p>

            <p>{r[3]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
