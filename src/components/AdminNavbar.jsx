"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("user");

    localStorage.removeItem("token");

    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    router.push("/admin/login");
  }

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },

    {
      name: "Menu",
      path: "/admin/menu",
    },

    {
      name: "Inventory",
      path: "/admin/inventory",
    },

    {
      name: "Coupons",
      path: "/admin/coupons",
    },

    {
      name: "Refunds",
      path: "/admin/refunds",
    },

    {
      name: "Reservations",
      path: "/admin/reservations",
    },

    {
      name: "Membership",
      path: "/admin/membership",
    },

    {
      name: "Subscriptions",
      path: "/admin/subscriptions",
    },

    {
      name: "Analytics",
      path: "/admin/analytics",
    },
    {
      name: "Tables",
      path: "/admin/tables",
    },
  ];

  return (
    <header
      className="
sticky
top-0
z-50
bg-white
border-b
shadow-sm
"
    >
      <div
        className="
max-w-7xl
mx-auto
px-5
py-4
flex
items-center
justify-between
gap-5
"
      >
        {/* BRAND */}

        <Link
          href="/admin/dashboard"
          className="
flex
items-center
gap-3
"
        >
          <div
            className="
w-11
h-11
rounded-2xl
bg-gradient-to-br
from-orange-500
to-red-500
flex
items-center
justify-center
text-white
font-bold
text-xl
shadow
"
          >
            C
          </div>

          <div>
            <h1
              className="
text-xl
font-bold
text-gray-800
"
            >
              CafeSync
            </h1>

            <p
              className="
text-xs
text-gray-500
"
            >
              Admin Panel
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}

        <nav
          className="
hidden
xl:flex
items-center
gap-1
"
        >
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="
px-3
py-2
rounded-lg
text-sm
font-medium
text-gray-600
hover:text-orange-600
hover:bg-orange-50
transition
"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}

        <div
          className="
flex
items-center
gap-3
"
        >
          <div
            className="
hidden
md:block
text-right
"
          >
            <p
              className="
text-sm
font-semibold
text-gray-800
"
            >
              Administrator
            </p>

            <p
              className="
text-xs
text-gray-500
"
            >
              Cafe Manager
            </p>
          </div>

          <button
            onClick={logout}
            className="
bg-red-500
hover:bg-red-600
text-white
px-4
py-2
rounded-xl
text-sm
font-medium
transition
shadow-sm
"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
