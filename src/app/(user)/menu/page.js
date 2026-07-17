"use client";

import { useEffect, useState } from "react";

export default function MenuPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponId, setCouponId] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/api/menu/items")
      .then((res) => res.json())
      .then((data) => setItems(data.data || []));
  }, []);

  async function applyCoupon() {
    const res = await fetch("http://localhost:4000/api/coupons/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: coupon,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setCouponId(data.coupon_id);

      let total = cart.reduce((sum, item) => sum + item[2] * item[3], 0);

      let discountAmount = 0;

      if (data.discount_type === "PERCENT") {
        discountAmount = (total * data.value) / 100;
      } else {
        discountAmount = data.value;
      }

      setDiscount(discountAmount);

      alert("Coupon applied");
    } else {
      alert(data.message);
    }
  }

  function addToCart(item) {
    const exists = cart.find((c) => c[0] === item[0]);

    if (exists) {
      setCart(
        cart.map((c) => (c[0] === item[0] ? [c[0], c[1], c[2] + 1, c[3]] : c)),
      );
    } else {
      setCart([...cart, [item[0], item[1], 1, item[3]]]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((c) => c[0] !== id));
  }

  async function placeOrder() {
    const user_id = 1;

    const total_amount = cart.reduce((sum, item) => sum + item[2] * item[3], 0);

    const payload = {
      user_id,
      items: cart,
      total_amount: total_amount - discount,
      coupon_id: couponId,
    };

    const res = await fetch("http://localhost:4000/api/orders/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert(`Order placed successfully! Order ID: ${data.order_id}`);
      setCart([]);
    } else {
      alert(data.message);
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item[2] * item[3], 0);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* MENU AREA */}

        <section className="flex-1">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Our Menu</h2>

            <p className="text-gray-500 mt-2">
              Choose your favorite food and add it to cart.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div
                key={item[0]}
                className="
                group
                bg-white
                rounded-3xl
                border
                p-5
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2
                "
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div
                      className="
                    h-14
                    w-14
                    rounded-2xl
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                    text-3xl
                    mb-4
                    "
                    >
                      🍛
                    </div>

                    <h3 className="text-xl font-bold text-gray-800">
                      {item[1]}
                    </h3>
                  </div>

                  <span
                    className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      item[5] === 1
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }
                    `}
                  >
                    {item[5] === 1 ? "Available" : "Unavailable"}
                  </span>
                </div>

                <p className="mt-3 text-gray-500 text-sm leading-6">
                  {item[2]}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-2xl font-extrabold text-orange-500">
                    {item[3]} BDT
                  </p>

                  <span
                    className="
                  rounded-full
                  bg-orange-50
                  px-3
                  py-1
                  text-xs
                  text-orange-600
                  "
                  >
                    {item[4]}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <button
                    onClick={() =>
                      (window.location.href = `/reviews/${item[0]}`)
                    }
                    className="
                    w-full
                    rounded-xl
                    border
                    border-orange-500
                    py-2.5
                    text-sm
                    font-semibold
                    text-orange-600
                    hover:bg-orange-50
                    transition
                    "
                  >
                    ⭐ View Reviews
                  </button>

                  <button
                    disabled={item[5] !== 1}
                    onClick={() => addToCart(item)}
                    className={`
                    w-full
                    rounded-xl
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    ${
                      item[5] === 1
                        ? "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"
                        : "bg-gray-300 cursor-not-allowed"
                    }
                    `}
                  >
                    Add To Cart 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* CART AREA */}

        <aside className="w-full lg:w-96">
          <div
            className="
            sticky
            top-24
            rounded-3xl
            border
            bg-white/90
            backdrop-blur
            shadow-xl
            p-6
            "
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Cart 🛒</h2>

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
                {cart.length}
              </span>
            </div>

            {cart.length === 0 ? (
              <div
                className="
              rounded-2xl
              bg-orange-50
              p-8
              text-center
              "
              >
                <div className="text-5xl mb-3">🛒</div>

                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div
                  className="
                  max-h-72
                  overflow-y-auto
                  space-y-4
                  pr-2
                  "
                >
                  {cart.map((item) => (
                    <div
                      key={item[0]}
                      className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      bg-gray-50
                      p-4
                      "
                    >
                      <div>
                        <h4
                          className="
                        font-semibold
                        text-gray-800
                        "
                        >
                          {item[1]}
                        </h4>

                        <p
                          className="
                        text-sm
                        text-gray-500
                        mt-1
                        "
                        >
                          {item[2]} × {item[3]} BDT
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item[0])}
                        className="
                        h-8
                        w-8
                        rounded-full
                        bg-red-100
                        text-red-500
                        hover:bg-red-200
                        transition
                        "
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div
                  className="
                border-t
                mt-6
                pt-5
                "
                >
                  <div
                    className="
                  flex
                  justify-between
                  text-lg
                  font-bold
                  "
                  >
                    <span>Subtotal</span>

                    <span className="text-orange-500">{cartTotal} BDT</span>
                  </div>

                  {/* Coupon */}

                  <div className="mt-6">
                    <label
                      className="
                    text-sm
                    font-semibold
                    text-gray-700
                    "
                    >
                      Coupon Code
                    </label>

                    <div
                      className="
                    mt-2
                    flex
                    gap-2
                    "
                    >
                      <input
                        className="
                        flex-1
                        rounded-xl
                        border
                        px-3
                        py-2
                        outline-none
                        focus:ring-2
                        focus:ring-orange-400
                        "
                        placeholder="Enter coupon"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />

                      <button
                        onClick={applyCoupon}
                        className="
                        rounded-xl
                        bg-orange-500
                        px-4
                        text-sm
                        font-semibold
                        text-white
                        hover:bg-orange-600
                        transition
                        "
                      >
                        Apply
                      </button>
                    </div>

                    {discount > 0 && (
                      <div
                        className="
                        mt-3
                        rounded-xl
                        bg-green-100
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-green-700
                        "
                      >
                        🎉 Discount:
                        <span className="font-bold"> {discount} BDT</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}

                  <div
                    className="
                    mt-6
                    rounded-2xl
                    bg-orange-50
                    p-4
                    "
                  >
                    <div
                      className="
                    flex
                    justify-between
                    text-xl
                    font-extrabold
                    "
                    >
                      <span>Total</span>

                      <span className="text-orange-600">
                        {cartTotal - discount} BDT
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={placeOrder}
                    className="
                    mt-5
                    w-full
                    rounded-2xl
                    bg-green-600
                    py-3
                    font-bold
                    text-white
                    shadow-lg
                    hover:bg-green-700
                    hover:-translate-y-1
                    transition
                    "
                  >
                    Confirm Order ✅
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Mobile Checkout Bar */}

      {cart.length > 0 && (
        <div
          className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
          border-t
          bg-white/90
          backdrop-blur-lg
          p-4
          shadow-xl
          lg:hidden
          "
        >
          <button
            onClick={placeOrder}
            className="
            w-full
            rounded-2xl
            bg-green-600
            py-3
            font-bold
            text-white
            "
          >
            Place Order • {cartTotal - discount} BDT
          </button>
        </div>
      )}
    </div>
  );
}
