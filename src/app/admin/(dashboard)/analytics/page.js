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
    <div
      className="
min-h-screen
bg-slate-50
p-5
md:p-8
"
    >
      {/* HEADER */}

      <div
        className="
bg-gradient-to-r
from-orange-500
to-red-500
rounded-3xl
p-6
md:p-8
text-white
shadow-lg
mb-8
"
      >
        <div>
          <h1
            className="
text-3xl
md:text-4xl
font-bold
"
          >
            CafeSync Analytics
          </h1>

          <p
            className="
text-orange-100
mt-2
"
          >
            Track sales performance, customer feedback and popular foods
          </p>
        </div>
      </div>

      {/* KPI CARDS */}

      <div
        className="
grid
grid-cols-1
md:grid-cols-3
gap-6
"
      >
        {/* SALES */}

        <div
          className="
bg-white
rounded-3xl
border
shadow-sm
p-6
hover:shadow-lg
transition
"
        >
          <div
            className="
flex
justify-between
items-center
"
          >
            <div>
              <p
                className="
text-gray-500
text-sm
"
              >
                Total Sales
              </p>

              <h2
                className="
text-3xl
font-bold
text-gray-800
mt-2
"
              >
                {sales.total_sales || 0}

                <span
                  className="
text-lg
ml-1
"
                >
                  BDT
                </span>
              </h2>
            </div>

            <div
              className="
w-12
h-12
rounded-2xl
bg-orange-100
flex
items-center
justify-center
text-2xl
"
            >
              💰
            </div>
          </div>
        </div>

        {/* ORDERS */}

        <div
          className="
bg-white
rounded-3xl
border
shadow-sm
p-6
hover:shadow-lg
transition
"
        >
          <div
            className="
flex
justify-between
items-center
"
          >
            <div>
              <p
                className="
text-gray-500
text-sm
"
              >
                Total Orders
              </p>

              <h2
                className="
text-3xl
font-bold
text-gray-800
mt-2
"
              >
                {sales.total_orders || 0}
              </h2>
            </div>

            <div
              className="
w-12
h-12
rounded-2xl
bg-blue-100
flex
items-center
justify-center
text-2xl
"
            >
              🛒
            </div>
          </div>
        </div>

        {/* FEEDBACK */}

        <div
          className="
bg-white
rounded-3xl
border
shadow-sm
p-6
hover:shadow-lg
transition
"
        >
          <div
            className="
flex
justify-between
items-center
"
          >
            <div>
              <p
                className="
text-gray-500
text-sm
"
              >
                Average Rating
              </p>

              <h2
                className="
text-3xl
font-bold
text-gray-800
mt-2
"
              >
                {feedback.average_rating || 0}

                <span
                  className="
text-yellow-500
text-xl
ml-2
"
                >
                  ★
                </span>
              </h2>
            </div>

            <div
              className="
w-12
h-12
rounded-2xl
bg-yellow-100
flex
items-center
justify-center
text-2xl
"
            >
              ⭐
            </div>
          </div>
        </div>
      </div>

      {/* TOP FOODS */}

      <div
        className="
mt-8
bg-white
rounded-3xl
border
shadow-sm
p-6
"
      >
        <div
          className="
flex
justify-between
items-center
mb-5
"
        >
          <div>
            <h2
              className="
text-xl
font-bold
text-gray-800
"
            >
              Top Selling Foods
            </h2>

            <p
              className="
text-sm
text-gray-500
"
            >
              Most popular menu items
            </p>
          </div>
        </div>

        {foods.length === 0 ? (
          <div
            className="
text-center
py-10
text-gray-500
"
          >
            No food sales data available
          </div>
        ) : (
          <div
            className="
space-y-4
"
          >
            {foods.map((f, i) => (
              <div
                key={i}
                className="
flex
items-center
justify-between
bg-slate-50
rounded-2xl
p-4
hover:bg-orange-50
transition
"
              >
                <div
                  className="
flex
items-center
gap-4
"
                >
                  <div
                    className="
w-10
h-10
rounded-full
bg-orange-500
text-white
flex
items-center
justify-center
font-bold
"
                  >
                    {i + 1}
                  </div>

                  <div>
                    <h3
                      className="
font-semibold
text-gray-800
"
                    >
                      {f[0]}
                    </h3>

                    <p
                      className="
text-sm
text-gray-500
"
                    >
                      Popular menu item
                    </p>
                  </div>
                </div>

                <div
                  className="
font-bold
text-orange-600
"
                >
                  {f[1]} sold
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
