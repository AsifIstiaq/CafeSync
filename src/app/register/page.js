"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:4000/api/auth/register",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success) {
        setMessage("Registration successful!");

        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          role: "customer",
        });
      } else {
        setMessage(data.message || data.error);
      }
    } catch {
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div
      className="
min-h-screen
bg-gradient-to-br
from-orange-50
via-white
to-orange-100
flex
items-center
justify-center
px-4
"
    >
      <div
        className="
w-full
max-w-6xl
grid
md:grid-cols-2
bg-white
rounded-3xl
shadow-2xl
overflow-hidden
"
      >
        {/* LEFT SIDE */}

        <div
          className="
hidden
md:flex
bg-gradient-to-br
from-orange-500
to-red-500
text-white
p-10
flex-col
justify-between
"
        >
          <div>
            <h1
              className="
text-5xl
font-extrabold
"
            >
              CafeSync
            </h1>

            <p
              className="
text-orange-100
text-lg
mt-3
"
            >
              Smart Cafe Management Platform
            </p>
          </div>

          <div
            className="
space-y-5
"
          >
            <div
              className="
bg-white/20
rounded-2xl
p-5
backdrop-blur
"
            >
              <h3
                className="
font-bold
text-lg
"
              >
                🍔 Easy Food Ordering
              </h3>

              <p
                className="
text-sm
text-orange-100
mt-1
"
              >
                Order food digitally with a seamless experience.
              </p>
            </div>

            <div
              className="
bg-white/20
rounded-2xl
p-5
backdrop-blur
"
            >
              <h3
                className="
font-bold
text-lg
"
              >
                ☕ Better Cafe Experience
              </h3>

              <p
                className="
text-sm
text-orange-100
mt-1
"
              >
                Manage reservations and enjoy faster service.
              </p>
            </div>

            <div
              className="
bg-white/20
rounded-2xl
p-5
backdrop-blur
"
            >
              <h3
                className="
font-bold
text-lg
"
              >
                📊 Smart Management
              </h3>

              <p
                className="
text-sm
text-orange-100
mt-1
"
              >
                A complete solution for modern cafes.
              </p>
            </div>
          </div>

          <p
            className="
text-sm
text-orange-100
"
          >
            © 2026 CafeSync
          </p>
        </div>

        {/* REGISTER FORM */}

        <div
          className="
p-8
md:p-12
"
        >
          <div
            className="
text-center
mb-7
"
          >
            <div
              className="
w-16
h-16
mx-auto
rounded-2xl
bg-orange-500
flex
items-center
justify-center
text-white
text-3xl
font-bold
shadow-lg
"
            >
              C
            </div>

            <h2
              className="
text-3xl
font-bold
text-gray-800
mt-5
"
            >
              Create Account
            </h2>

            <p
              className="
text-gray-500
mt-2
"
            >
              Join CafeSync today
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
space-y-4
"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
transition
"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
transition
"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
transition
"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
transition
"
            />

            <button
              disabled={loading}
              className="
w-full
bg-gradient-to-r
from-orange-500
to-red-500
hover:from-orange-600
hover:to-red-600
text-white
py-3
rounded-xl
font-semibold
shadow-lg
transition
disabled:opacity-50
"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            {message && (
              <div
                className={`
text-center
text-sm
rounded-xl
p-3

${
  message.includes("successful")
    ? "bg-green-50 text-green-600 border border-green-200"
    : "bg-red-50 text-red-600 border border-red-200"
}

`}
              >
                {message}
              </div>
            )}
          </form>

          <div
            className="
text-center
mt-7
text-sm
text-gray-600
"
          >
            Already have an account?
            <Link
              href="/login"
              className="
text-orange-500
font-semibold
ml-1
hover:underline
"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
