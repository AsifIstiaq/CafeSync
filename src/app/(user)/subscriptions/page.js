"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function SubscriptionPage() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const user_id = user.id;

  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchPlans();
    fetchSubscriptions();
  }, []);

  async function fetchPlans() {
    const res = await fetch("http://localhost:4000/api/subscriptions/plans");

    const data = await res.json();

    if (data.success) {
      setPlans(data.data);
    }
  }

  async function fetchSubscriptions() {
    const res = await fetch(
      `http://localhost:4000/api/subscriptions/user/${user_id}`,
    );

    const data = await res.json();

    if (data.success) {
      setSubscriptions(data.data);
    }
  }

  async function subscribe(plan) {
    const res = await fetch("http://localhost:4000/api/subscriptions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        plan_type: plan.plan_type,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Subscription Successful");

      fetchSubscriptions();
    } else {
      alert(data.message);
    }
  }

  async function cancelSubscription(sub_id) {
    const ok = confirm("Cancel this subscription?");

    if (!ok) return;

    const res = await fetch(
      `http://localhost:4000/api/subscriptions/cancel/${sub_id}`,
      {
        method: "PUT",
      },
    );

    const data = await res.json();

    if (data.success) {
      alert("Subscription Cancelled");

      fetchSubscriptions();
    } else {
      alert(data.message);
    }
  }

  function planIcon(title) {
    if (title?.toLowerCase().includes("weekly")) return "📅";
    if (title?.toLowerCase().includes("monthly")) return "⭐";

    return "🍽️";
  }

  return (
    <div className="relative min-h-screen overflow-hidden p-6">
      {/* Background */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
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
              🍱
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
                Meal Subscription
              </h1>

              <p className="mt-2 text-gray-500">
                Subscribe to meal plans and enjoy hassle-free cafeteria meals.
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}

        <section>
          <div className="mb-6">
            <h2
              className="
            text-2xl
            font-bold
            text-gray-800
            "
            >
              Available Plans
            </h2>

            <p className="mt-1 text-gray-500">
              Choose the plan that fits your daily meal needs.
            </p>
          </div>

          <div
            className="
          grid
          gap-6
          md:grid-cols-2
          "
          >
            {plans.map((plan, index) => (
              <div
                key={index}
                className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                bg-white
                p-7
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                "
              >
                <div
                  className="
                absolute
                right-0
                top-0
                h-32
                w-32
                rounded-full
                bg-orange-100
                blur-2xl
                "
                />

                <div className="relative">
                  <div
                    className="
                  flex
                  items-center
                  justify-between
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
                    bg-orange-100
                    text-3xl
                    "
                    >
                      {planIcon(plan.title)}
                    </div>

                    <span
                      className="
                    rounded-full
                    bg-orange-100
                    px-4
                    py-1
                    text-sm
                    font-semibold
                    text-orange-600
                    "
                    >
                      Popular
                    </span>
                  </div>

                  <h3
                    className="
                  mt-6
                  text-2xl
                  font-extrabold
                  text-gray-800
                  "
                  >
                    {plan.title}
                  </h3>

                  <p className="mt-3 text-gray-500">
                    Enjoy fresh meals with a convenient subscription package.
                  </p>

                  <div className="mt-5 space-y-2">
                    <p className="text-gray-600">
                      ⏳ Duration:
                      <span className="font-semibold">
                        {" "}
                        {plan.duration} days
                      </span>
                    </p>

                    <p
                      className="
                    text-3xl
                    font-extrabold
                    text-orange-500
                    "
                    >
                      {plan.price} BDT
                    </p>
                  </div>

                  <button
                    onClick={() => subscribe(plan)}
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
                    Subscribe Now 🚀
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My Subscriptions */}

        <section className="mt-14">
          <div className="mb-6">
            <h2
              className="
            text-2xl
            font-bold
            text-gray-800
            "
            >
              My Subscriptions
            </h2>

            <p className="mt-1 text-gray-500">
              Manage your active meal subscriptions.
            </p>
          </div>

          {subscriptions.length === 0 ? (
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
              <div className="mb-4 text-6xl">📭</div>

              <h3
                className="
              text-xl
              font-bold
              text-gray-800
              "
              >
                No Subscription Found
              </h3>

              <p className="mt-2 text-gray-500">
                Subscribe to a plan to see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {subscriptions.map((sub) => (
                <div
                  key={sub[0]}
                  className="
                  rounded-3xl
                  border
                  bg-white
                  p-6
                  shadow-md
                  transition
                  hover:shadow-xl
                  "
                >
                  <div
                    className="
                  flex
                  flex-col
                  gap-5
                  md:flex-row
                  md:items-center
                  md:justify-between
                  "
                  >
                    <div className="flex gap-4">
                      <div
                        className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-orange-100
                      text-3xl
                      "
                      >
                        🍽️
                      </div>

                      <div>
                        <h3
                          className="
                        text-xl
                        font-bold
                        text-gray-800
                        "
                        >
                          {sub[1]}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                          Start: {new Date(sub[2]).toLocaleDateString()}
                        </p>

                        <p className="text-sm text-gray-500">
                          End: {new Date(sub[3]).toLocaleDateString()}
                        </p>

                        <p
                          className="
                        mt-3
                        font-bold
                        text-orange-500
                        "
                        >
                          {sub[4]} BDT
                        </p>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <span
                        className={`
                        inline-flex
                        rounded-full
                        px-4
                        py-2
                        text-sm
                        font-semibold

                        ${
                          sub[5] === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                        `}
                      >
                        {sub[5]}
                      </span>

                      {sub[5] === "Active" && (
                        <button
                          onClick={() => cancelSubscription(sub[0])}
                          className="
                          mt-4
                          block
                          rounded-xl
                          bg-red-500
                          px-5
                          py-2
                          text-sm
                          font-semibold
                          text-white
                          transition
                          hover:bg-red-600
                          "
                        >
                          Cancel Subscription
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
