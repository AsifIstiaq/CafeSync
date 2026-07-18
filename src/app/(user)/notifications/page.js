"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(Cookies.get("user") || "{}");
  const user_id = user.id;

  async function loadNotifications() {
    const res = await fetch(
      `http://localhost:4000/api/notifications/user/${user_id}`,
    );

    const data = await res.json();

    setNotifications(data.data || []);
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function markRead(id) {
    await fetch(`http://localhost:4000/api/notifications/read/${id}`, {
      method: "PUT",
    });

    loadNotifications();
  }

  function notificationIcon(type) {
    const icons = {
      order: "🍽️",
      payment: "💳",
      reservation: "🪑",
      refund: "💰",
      system: "🔔",
    };

    return icons[type?.toLowerCase()] || "🔔";
  }

  return (
    <div className="relative min-h-screen overflow-hidden p-6">
      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}

        <div
          className="
          mb-8
          rounded-3xl
          border
          bg-white/80
          p-6
          shadow-lg
          backdrop-blur-lg
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-orange-100
              text-4xl
              "
            >
              🔔
            </div>

            <div>
              <h1
                className="
                text-3xl
                font-extrabold
                text-gray-800
                md:text-4xl
                "
              >
                Notifications
              </h1>

              <p className="mt-1 text-gray-500">
                Stay updated with your latest CafeSync activities.
              </p>
            </div>
          </div>
        </div>

        {/* Notification List */}

        <div className="space-y-5">
          {notifications.length === 0 && (
            <div
              className="
              rounded-3xl
              border
              bg-white
              p-12
              text-center
              shadow-md
              "
            >
              <div className="mb-4 text-6xl">📭</div>

              <h2
                className="
                text-xl
                font-bold
                text-gray-800
                "
              >
                No Notifications
              </h2>

              <p className="mt-2 text-gray-500">You're all caught up!</p>
            </div>
          )}

          {notifications.map((n, index) => (
            <div
              key={index}
              className={`
              group
              flex
              flex-col
              gap-4
              rounded-3xl
              border
              bg-white/90
              p-6
              shadow-md
              backdrop-blur
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              md:flex-row
              md:items-center
              md:justify-between

              ${
                n[3] === 0
                  ? "border-orange-300 ring-2 ring-orange-100"
                  : "border-gray-100"
              }

              `}
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-orange-100
                  text-3xl
                  "
                >
                  {notificationIcon(n[1])}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className="
                      text-lg
                      font-bold
                      text-gray-800
                      "
                    >
                      {n[1]}
                    </h3>

                    {n[3] === 0 && (
                      <span
                        className="
                        rounded-full
                        bg-orange-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-orange-600
                        "
                      >
                        New
                      </span>
                    )}
                  </div>

                  <p
                    className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-600
                    "
                  >
                    {n[2]}
                  </p>

                  <p
                    className="
                    mt-3
                    text-xs
                    text-gray-400
                    "
                  >
                    🕒 {String(n[4])}
                  </p>
                </div>
              </div>

              {n[3] === 0 && (
                <button
                  onClick={() => markRead(n[0])}
                  className="
                  rounded-xl
                  bg-orange-500
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  hover:bg-orange-600
                  hover:shadow-lg
                  "
                >
                  Mark as Read ✓
                </button>
              )}

              {n[3] !== 0 && (
                <span
                  className="
                  rounded-xl
                  bg-gray-100
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-500
                  "
                >
                  Read
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
