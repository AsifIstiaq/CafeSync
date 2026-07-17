"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setUser(storedUser);
  }, []);

  function logout() {
    localStorage.removeItem("user");

    Cookies.remove("user");

    window.location.href = "/login";
  }

  const adminLinks = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: "📊",
    },
    {
      name: "Menu",
      href: "/admin/menu",
      icon: "🍔",
    },
    {
      name: "Inventory",
      href: "/admin/inventory",
      icon: "📦",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: "🛒",
    },
    {
      name: "Reservations",
      href: "/admin/reservations",
      icon: "🪑",
    },
    {
      name: "Refunds",
      href: "/admin/refunds",
      icon: "💰",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: "📈",
    },
  ];

  const userLinks = [
    {
      name: "Menu",
      href: "/menu",
      icon: "🍽️",
    },
    {
      name: "Orders",
      href: "/orders",
      icon: "🛒",
    },
    {
      name: "Reservations",
      href: "/my-reservations",
      icon: "🪑",
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: "🔔",
    },
    {
      name: "Membership",
      href: "/membership",
      icon: "🎫",
    },
    {
      name: "Subscriptions",
      href: "/subscriptions",
      icon: "🍱",
    },
    {
      name: "Feedback",
      href: "/feedback",
      icon: "💬",
    },
    {
      name: "Tables",
      href: "/tables",
      icon: "🪑",
    },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      border-b
      bg-white/90
      shadow-sm
      backdrop-blur-lg
      "
    >
      <div
        className="
        mx-auto
        flex
        max-w-7xl
        items-center
        justify-between
        px-5
        py-4
        "
      >
        {/* Logo */}

        <Link
          href={user?.role === "admin" ? "/admin/dashboard" : "/menu"}
          className="
          flex
          items-center
          gap-2
          text-2xl
          font-extrabold
          text-orange-500
          "
        >
          <span
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-orange-100
            "
          >
            ☕
          </span>
          CafeSync
        </Link>

        {/* Desktop Links */}

        <div
          className="
          hidden
          items-center
          gap-1
          lg:flex
          "
        >
          {links?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
              flex
              items-center
              gap-2
              rounded-xl
              px-3
              py-2
              text-sm
              font-medium
              transition

              ${
                pathname === link.href
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              }
              `}
            >
              <span>{link.icon}</span>

              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}

        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={logout}
              className="
              rounded-xl
              bg-red-500
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-600
              "
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                text-orange-500
                hover:bg-orange-50
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                rounded-xl
                bg-orange-500
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                hover:bg-orange-600
                "
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}

          {user && (
            <button
              onClick={() => setOpen(!open)}
              className="
              rounded-xl
              bg-orange-100
              px-3
              py-2
              text-orange-600
              lg:hidden
              "
            >
              ☰
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div
          className="
          border-t
          bg-white
          p-4
          lg:hidden
          "
        >
          <div className="flex flex-col gap-2">
            {links?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-gray-700
                hover:bg-orange-50
                "
              >
                {link.icon}

                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
