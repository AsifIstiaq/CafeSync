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

    if (data.success) setCoupons(data.data);
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
    await fetch(
      `http://localhost:4000/api/coupons/${id}`,

      {
        method: "DELETE",
      },
    );

    fetchCoupons();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Coupon Management</h1>

      <div className="bg-white shadow rounded-xl p-5 space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Coupon Code"
          onChange={(e) =>
            setForm({
              ...form,
              code: e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              discount_type: e.target.value,
            })
          }
        >
          <option value="PERCENT">Percentage</option>

          <option value="FIXED">Fixed Amount</option>
        </select>

        <input
          className="border p-2 w-full"
          placeholder="Value"
          type="number"
          onChange={(e) =>
            setForm({
              ...form,
              value: e.target.value,
            })
          }
        />

        <input
          className="border p-2 w-full"
          type="date"
          onChange={(e) =>
            setForm({
              ...form,
              expiry: e.target.value,
            })
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="Usage Limit"
          type="number"
          onChange={(e) =>
            setForm({
              ...form,
              usage_limit: e.target.value,
            })
          }
        />

        <button
          onClick={createCoupon}
          className="
bg-orange-500
text-white
px-5
py-2
rounded
"
        >
          Create Coupon
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Available Coupons</h2>

        {coupons.map((c) => (
          <div
            key={c[0]}
            className="
border
rounded
p-4
mt-3
flex
justify-between
"
          >
            <div>
              <p>
                Code:
                <b>{c[1]}</b>
              </p>

              <p>
                Discount:
                {c[2]} {c[3]}
              </p>

              <p>
                Expiry:
                {String(c[4])}
              </p>
            </div>

            <button
              onClick={() => deleteCoupon(c[0])}
              className="
text-red-500
"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
