"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const user_id = 1;

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
    await fetch(
      `http://localhost:4000/api/notifications/read/${id}`,

      {
        method: "PUT",
      },
    );

    loadNotifications();
  }

  return (
    <div
      className="
min-h-screen
bg-gray-50
p-4
md:p-6
"
    >
      <h1
        className="
text-2xl
font-bold
text-orange-500
mb-6
"
      >
        Notifications
      </h1>

      <div
        className="
space-y-3
max-w-3xl
"
      >
        {notifications.length === 0 && (
          <p className="text-gray-500">No notifications</p>
        )}

        {notifications.map((n, index) => (
          <div
            key={index}
            className={`
bg-white
border
rounded-xl
p-4
shadow-sm
flex
justify-between
items-center

${n[3] === 0 ? "border-orange-300" : ""}

`}
          >
            <div>
              <p
                className="
font-semibold
"
              >
                {n[1]}
              </p>

              <p
                className="
text-gray-600
text-sm
"
              >
                {n[2]}
              </p>

              <p
                className="
text-xs
text-gray-400
mt-1
"
              >
                {String(n[4])}
              </p>
            </div>

            {n[3] === 0 && (
              <button
                onClick={() => markRead(n[0])}
                className="
bg-orange-500
text-white
px-3
py-1
rounded-lg
text-sm
"
              >
                Mark Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
