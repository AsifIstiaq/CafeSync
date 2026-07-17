"use client";

export default function ReservationBadge({ status }) {
  const styles = {
    Pending: {
      className: "bg-yellow-100 text-yellow-700 border-yellow-300",
      icon: "⏳",
    },

    Approved: {
      className: "bg-green-100 text-green-700 border-green-300",
      icon: "✅",
    },

    Rejected: {
      className: "bg-red-100 text-red-700 border-red-300",
      icon: "❌",
    },

    Completed: {
      className: "bg-blue-100 text-blue-700 border-blue-300",
      icon: "🎉",
    },
  };

  const current = styles[status] || {
    className: "bg-gray-100 text-gray-700 border-gray-300",
    icon: "ℹ️",
  };

  return (
    <span
      className={`
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      px-4
      py-1.5
      text-xs
      font-semibold
      ${current.className}
      `}
    >
      {current.icon}

      {status}
    </span>
  );
}
