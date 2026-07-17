"use client";

import { useEffect, useState } from "react";

export default function MembershipPage() {
  const user_id = 1;

  const [card, setCard] = useState(null);

  useEffect(() => {
    fetchMembership();
  }, []);

  async function fetchMembership() {
    const res = await fetch(
      `http://localhost:4000/api/membership/user/${user_id}`,
    );

    const data = await res.json();

    if (data.success && data.data.length > 0) {
      setCard(data.data[0]);
    }
  }

  function tierStyle(tier) {
    if (tier === "Gold") return "bg-yellow-100 text-yellow-700";

    if (tier === "Platinum") return "bg-purple-100 text-purple-700";

    return "bg-gray-200 text-gray-700";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Membership Card</h1>

        {!card ? (
          <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
            No membership card found
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow border p-6">
            <h2 className="text-2xl font-bold">CafeSync Membership</h2>

            <div className="mt-5">
              <span
                className={`
px-4
py-2
rounded-full
font-semibold
${tierStyle(card[1])}
`}
              >
                {card[1]}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <p>
                Points:
                <span className="font-bold"> {card[2]}</span>
              </p>

              <p>Issue Date: {new Date(card[3]).toLocaleDateString()}</p>

              <p>Expiry Date: {new Date(card[4]).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
