"use client";

import { useEffect, useState } from "react";

export default function MenuPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/menu/items")
      .then((res) => res.json())
      .then((data) => setItems(data.data || []));
  }, []);

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
      total_amount,
    };

    const res = await fetch("http://localhost:4000/api/orders/place", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-orange-500">
          Cafe Menu
        </h1>
      </header>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* MENU SECTION */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item[0]}
                className="bg-white rounded-xl border hover:shadow-lg transition p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="font-semibold text-lg">{item[1]}</h2>

                  <p className="text-sm text-gray-500 mt-1">{item[2]}</p>

                  <p className="mt-2 font-bold text-orange-500">
                    {item[3]} BDT
                  </p>

                  <p className="text-xs mt-1 text-gray-500">
                    Category: {item[4]}
                  </p>

                  <p
                    className={`text-sm mt-1 font-medium ${
                      item[5] === 1 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item[5] === 1 ? "Available" : "Not Available"}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {/* REVIEW BUTTON */}
                  <button
                    onClick={() =>
                      (window.location.href = `/reviews/${item[0]}`)
                    }
                    className="
    w-full
    py-2
    rounded-lg
    border
    border-orange-500
    text-orange-500
    text-sm
    font-medium
    hover:bg-orange-50
    "
                  >
                    View Reviews ⭐
                  </button>

                  {/* CART BUTTON */}
                  <button
                    disabled={item[5] !== 1}
                    onClick={() => addToCart(item)}
                    className={`w-full py-2 rounded-lg text-white text-sm font-medium transition ${
                      item[5] === 1
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CART SECTION */}
        <div className="w-full lg:w-80">
          <div className="bg-white border rounded-xl p-4 shadow-sm lg:sticky lg:top-20">
            <h2 className="text-lg font-bold mb-3">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item[0]}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="font-medium text-sm">{item[1]}</p>
                        <p className="text-xs text-gray-500">
                          {item[2]} × {item[3]}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item[0])}
                        className="text-red-500 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-3">
                  <p className="font-bold flex justify-between">
                    <span>Total</span>
                    <span>
                      {cart.reduce((sum, item) => sum + item[2] * item[3], 0)}{" "}
                      BDT
                    </span>
                  </p>

                  <button
                    onClick={placeOrder}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE CART FIX (optional improvement) */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 lg:hidden shadow-lg">
          <button
            onClick={placeOrder}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            Place Order (
            {cart.reduce((sum, item) => sum + item[2] * item[3], 0)} BDT)
          </button>
        </div>
      )}
    </div>
  );
}
