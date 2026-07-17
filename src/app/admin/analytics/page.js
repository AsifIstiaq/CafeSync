"use client";

import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [sales, setSales] = useState({});
  const [foods, setFoods] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    load();
  }, []);

  async function load() {
    let a = await fetch("http://localhost:4000/api/analytics/sales");

    let b = await fetch("http://localhost:4000/api/analytics/top-foods");

    let c = await fetch("http://localhost:4000/api/analytics/feedback");

    setSales((await a.json()).data);

    setFoods((await b.json()).data);

    setFeedback((await c.json()).data);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">CafeSync Analytics</h1>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Total Sales</h2>

          <p className="text-2xl font-bold">{sales.total_sales} BDT</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Orders</h2>

          <p className="text-2xl font-bold">{sales.total_orders}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Average Feedback</h2>

          <p className="text-2xl font-bold">{feedback.average_rating}</p>
        </div>
      </div>

      <div className="bg-white mt-6 p-5 rounded-xl shadow">
        <h2 className="font-bold mb-4">Top Foods</h2>

        {foods.map((f, i) => (
          <p key={i}>
            {f[0]} - {f[1]} sold
          </p>
        ))}
      </div>
    </div>
  );
}
