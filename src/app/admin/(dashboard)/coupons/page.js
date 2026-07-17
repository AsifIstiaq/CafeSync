"use client";

import { useEffect, useState } from "react";

export default function CouponPage() {
  const [coupons, setCoupons] = useState([]);

  const [form, setForm] = useState({
    code: "",
    discount_type: "PERCENT",
    value: "",
    expiry: "",
    usage_limit: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  async function fetchCoupons() {
    const res = await fetch("http://localhost:4000/api/coupons");

    const data = await res.json();

    if (data.success) {
      setCoupons(data.data);
    }
  }

  async function createCoupon() {
    await fetch("http://localhost:4000/api/coupons/create", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),
    });

    alert("Coupon created");

    fetchCoupons();
  }

  async function deleteCoupon(id) {
    await fetch(`http://localhost:4000/api/coupons/${id}`, {
      method: "DELETE",
    });

    fetchCoupons();
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
        <div
          className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-4
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
              Coupon Management
            </h1>

            <p
              className="
text-orange-100
mt-2
"
            >
              Create promotional offers and manage discount campaigns
            </p>
          </div>

          <div
            className="
bg-white/20
px-5
py-3
rounded-2xl
backdrop-blur
"
          >
            <p className="text-sm text-orange-100">Total Coupons</p>

            <h2
              className="
text-3xl
font-bold
"
            >
              {coupons.length}
            </h2>
          </div>
        </div>
      </div>

      <div
        className="
grid
lg:grid-cols-[400px_1fr]
gap-8
"
      >
        {/* CREATE COUPON FORM */}

        <div>
          <div
            className="
bg-white
rounded-3xl
shadow-sm
border
p-6
sticky
top-6
"
          >
            <h2
              className="
text-xl
font-bold
text-gray-800
mb-5
"
            >
              Create New Coupon
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  className="
text-sm
font-medium
text-gray-700
"
                >
                  Coupon Code
                </label>

                <input
                  value={form.code}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      code: e.target.value,
                    })
                  }
                  placeholder="WELCOME20"
                  className="
mt-2
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
"
                />
              </div>

              <div>
                <label
                  className="
text-sm
font-medium
text-gray-700
"
                >
                  Discount Type
                </label>

                <select
                  value={form.discount_type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discount_type: e.target.value,
                    })
                  }
                  className="
mt-2
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
"
                >
                  <option value="PERCENT">Percentage Discount</option>

                  <option value="FIXED">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label
                  className="
text-sm
font-medium
text-gray-700
"
                >
                  Discount Value
                </label>

                <input
                  type="number"
                  value={form.value}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      value: e.target.value,
                    })
                  }
                  placeholder="20"
                  className="
mt-2
w-full
border
rounded-xl
px-4
py-3
"
                />
              </div>

              <div>
                <label
                  className="
text-sm
font-medium
text-gray-700
"
                >
                  Expiry Date
                </label>

                <input
                  type="date"
                  value={form.expiry}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      expiry: e.target.value,
                    })
                  }
                  className="
mt-2
w-full
border
rounded-xl
px-4
py-3
"
                />
              </div>

              <div>
                <label
                  className="
text-sm
font-medium
text-gray-700
"
                >
                  Usage Limit
                </label>

                <input
                  type="number"
                  value={form.usage_limit}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      usage_limit: e.target.value,
                    })
                  }
                  placeholder="100"
                  className="
mt-2
w-full
border
rounded-xl
px-4
py-3
"
                />
              </div>

              <button
                onClick={createCoupon}
                className="
w-full
bg-orange-500
hover:bg-orange-600
text-white
font-semibold
py-3
rounded-xl
transition
"
              >
                Create Coupon
              </button>
            </div>
          </div>
        </div>

        {/* COUPON LIST */}

        <div>
          <h2
            className="
text-2xl
font-bold
text-gray-800
mb-5
"
          >
            Available Coupons
          </h2>

          {coupons.length === 0 ? (
            <div
              className="
bg-white
rounded-3xl
p-10
text-center
border
"
            >
              <div className="text-5xl">🎟️</div>

              <h3
                className="
mt-4
font-semibold
text-gray-700
"
              >
                No Coupons Available
              </h3>

              <p
                className="
text-gray-500
mt-2
"
              >
                Create your first discount coupon.
              </p>
            </div>
          ) : (
            <div
              className="
grid
md:grid-cols-2
gap-5
"
            >
              {coupons.map((c) => (
                <div
                  key={c[0]}
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
items-start
"
                  >
                    <div>
                      <p
                        className="
text-sm
text-gray-500
"
                      >
                        Coupon Code
                      </p>

                      <h3
                        className="
text-2xl
font-bold
text-orange-500
"
                      >
                        {c[1]}
                      </h3>
                    </div>

                    <span
                      className="
bg-orange-100
text-orange-600
px-3
py-1
rounded-full
text-xs
font-semibold
"
                    >
                      {c[3]}
                    </span>
                  </div>

                  <div
                    className="
mt-5
space-y-2
text-sm
text-gray-600
"
                  >
                    <p>
                      Discount:
                      <span className="font-semibold text-gray-800">
                        {" "}
                        {c[2]} {c[3]}
                      </span>
                    </p>

                    <p>
                      Expiry:
                      <span className="font-semibold text-gray-800">
                        {" "}
                        {String(c[4])}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => deleteCoupon(c[0])}
                    className="
mt-5
w-full
bg-red-50
text-red-600
hover:bg-red-100
py-2
rounded-xl
font-medium
transition
"
                  >
                    Delete Coupon
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
