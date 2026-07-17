"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://localhost:4000/api/auth/login",

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
        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        Cookies.set(
          "user",

          JSON.stringify(data.user),

          {
            expires: 7,
          },
        );

        switch (data.user.role.toLowerCase()) {
          case "admin":
            router.push("/admin/menu");

            break;

          case "staff":
            router.push("/staff/dashboard");

            break;

          case "customer":
            router.push("/menu");

            break;

          default:
            setMessage("Unknown user role");

            break;
        }
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Server error");
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
        {/* LEFT BRAND SECTION */}

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
mt-4
text-orange-100
text-lg
"
            >
              Smart Cafe Management System
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
p-4
backdrop-blur
"
            >
              <h3
                className="
font-bold
"
              >
                🍽 Digital Ordering
              </h3>

              <p
                className="
text-sm
text-orange-100
"
              >
                Manage menu, orders and customers easily.
              </p>
            </div>

            <div
              className="
bg-white/20
rounded-2xl
p-4
backdrop-blur
"
            >
              <h3
                className="
font-bold
"
              >
                📊 Smart Analytics
              </h3>

              <p
                className="
text-sm
text-orange-100
"
              >
                Track sales and cafe performance.
              </p>
            </div>

            <div
              className="
bg-white/20
rounded-2xl
p-4
backdrop-blur
"
            >
              <h3
                className="
font-bold
"
              >
                ☕ Restaurant Automation
              </h3>

              <p
                className="
text-sm
text-orange-100
"
              >
                Modern solution for modern cafes.
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

        {/* LOGIN SECTION */}

        <div
          className="
p-8
md:p-12
"
        >
          <div
            className="
text-center
mb-8
"
          >
            <div
              className="
mx-auto
w-16
h-16
rounded-2xl
bg-orange-500
text-white
flex
items-center
justify-center
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
              Welcome Back
            </h2>

            <p
              className="
text-gray-500
mt-2
"
            >
              Login to your CafeSync account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
space-y-5
"
          >
            <div>
              <label
                className="
text-sm
font-semibold
text-gray-700
"
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
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
transition
"
                required
              />
            </div>

            <div>
              <label
                className="
text-sm
font-semibold
text-gray-700
"
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
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
transition
"
                required
              />
            </div>

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
              {loading ? "Logging in..." : "Login"}
            </button>

            {message && (
              <div
                className="
bg-red-50
border
border-red-200
text-red-600
rounded-xl
p-3
text-center
text-sm
"
              >
                {message}
              </div>
            )}
          </form>

          <div
            className="
text-center
mt-8
text-sm
text-gray-600
"
          >
            Do not have an account?
            <Link
              href="/register"
              className="
text-orange-500
font-semibold
ml-1
hover:underline
"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
