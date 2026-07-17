"use client";

import { useEffect, useState } from "react";

export default function SubscriptionPage() {
  const user_id = 1;

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Meal Subscription</h1>

        {/* Plans */}

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white rounded-xl shadow border p-6">
              <h2 className="text-2xl font-bold text-orange-500">
                {plan.title}
              </h2>

              <p className="mt-4 text-gray-600">
                Duration: {plan.duration} day(s)
              </p>

              <p className="text-3xl font-bold mt-3">{plan.price} BDT</p>

              <button
                onClick={() => subscribe(plan)}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>

        {/* User Subscriptions */}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">My Subscriptions</h2>

          {subscriptions.length === 0 ? (
            <div className="bg-white rounded-lg border p-6 text-center text-gray-500">
              No subscription found
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub[0]}
                  className="bg-white border rounded-xl shadow p-5"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{sub[1]}</h3>

                      <p className="text-sm text-gray-500">
                        Start: {new Date(sub[2]).toLocaleDateString()}
                      </p>

                      <p className="text-sm text-gray-500">
                        End: {new Date(sub[3]).toLocaleDateString()}
                      </p>

                      <p className="font-semibold mt-2">{sub[4]} BDT</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-sm

                        ${
                          sub[5] === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {sub[5]}
                      </span>

                      {sub[5] === "Active" && (
                        <button
                          onClick={() => cancelSubscription(sub[0])}
                          className="block mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
