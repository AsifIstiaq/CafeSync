"use client";
import Cookies from "js-cookie";

import { useEffect, useState } from "react";

export default function MembershipPage() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const user_id = user.id;

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
    if (tier === "Gold") {
      return {
        badge: "bg-yellow-100 text-yellow-700",
        gradient: "from-yellow-400 to-orange-500",
        icon: "🥇",
      };
    }

    if (tier === "Platinum") {
      return {
        badge: "bg-purple-100 text-purple-700",
        gradient: "from-purple-500 to-indigo-600",
        icon: "💎",
      };
    }

    return {
      badge: "bg-gray-200 text-gray-700",
      gradient: "from-gray-400 to-gray-600",
      icon: "⭐",
    };
  }

  const style = card ? tierStyle(card[1]) : null;

  return (
    <div className="relative min-h-screen overflow-hidden p-6">
      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}

        <div
          className="
          mb-10
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
              🎫
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
                My Membership Card
              </h1>

              <p className="mt-1 text-gray-500">
                Enjoy exclusive rewards and benefits with CafeSync membership.
              </p>
            </div>
          </div>
        </div>

        {!card ? (
          <div
            className="
            rounded-3xl
            border
            bg-white
            p-12
            text-center
            shadow-md
            "
          >
            <div className="mb-5 text-6xl">💳</div>

            <h2
              className="
              text-xl
              font-bold
              text-gray-800
              "
            >
              No Membership Card Found
            </h2>

            <p className="mt-2 text-gray-500">
              You don't have an active CafeSync membership yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Membership Card */}

            <div
              className={`
              relative
              overflow-hidden
              rounded-3xl
              bg-gradient-to-br
              ${style.gradient}
              p-8
              text-white
              shadow-2xl
              `}
            >
              {/* Decorative Circles */}

              <div
                className="
                absolute
                -right-20
                -top-20
                h-60
                w-60
                rounded-full
                bg-white/10
                "
              />

              <div
                className="
                absolute
                -bottom-20
                -left-20
                h-60
                w-60
                rounded-full
                bg-white/10
                "
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-white/80">CafeSync</p>

                    <h2
                      className="
                      mt-2
                      text-3xl
                      font-extrabold
                      "
                    >
                      Membership Card
                    </h2>
                  </div>

                  <div className="text-5xl">{style.icon}</div>
                </div>

                <div className="mt-10">
                  <p className="text-sm text-white/80">Membership Tier</p>

                  <span
                    className="
                    mt-2
                    inline-flex
                    rounded-full
                    bg-white/20
                    px-5
                    py-2
                    font-bold
                    backdrop-blur
                    "
                  >
                    {card[1]}
                  </span>
                </div>

                <div
                  className="
                mt-10
                flex
                justify-between
                "
                >
                  <div>
                    <p className="text-sm text-white/80">Reward Points</p>

                    <p className="text-3xl font-extrabold">{card[2]}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-white/80">Status</p>

                    <p className="font-bold">Active ✓</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}

            <div
              className="
              rounded-3xl
              border
              bg-white
              p-8
              shadow-md
              "
            >
              <h3
                className="
                text-xl
                font-bold
                text-gray-800
                "
              >
                Membership Details
              </h3>

              <div
                className="
              mt-6
              grid
              gap-5
              md:grid-cols-2
              "
              >
                <div
                  className="
                  rounded-2xl
                  bg-orange-50
                  p-5
                  "
                >
                  <p className="text-sm text-gray-500">Membership Level</p>

                  <p className="mt-1 text-lg font-bold text-orange-600">
                    {card[1]}
                  </p>
                </div>

                <div
                  className="
                  rounded-2xl
                  bg-orange-50
                  p-5
                  "
                >
                  <p className="text-sm text-gray-500">Reward Points</p>

                  <p className="mt-1 text-lg font-bold text-orange-600">
                    {card[2]} Points
                  </p>
                </div>

                <div
                  className="
                  rounded-2xl
                  bg-gray-50
                  p-5
                  "
                >
                  <p className="text-sm text-gray-500">Issue Date</p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {new Date(card[3]).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className="
                  rounded-2xl
                  bg-gray-50
                  p-5
                  "
                >
                  <p className="text-sm text-gray-500">Expiry Date</p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {new Date(card[4]).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
