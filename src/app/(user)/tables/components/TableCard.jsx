"use client";

import { useRouter } from "next/navigation";

export default function TableCard({ table }) {
  const router = useRouter();

  const table_id = table[0];
  const table_number = table[1];
  const capacity = table[2];
  const status = table[3];
  const location = table[4];

  const statusStyle = {
    available: {
      badge: "bg-green-100 text-green-700 border-green-300",
      icon: "🟢",
    },

    occupied: {
      badge: "bg-red-100 text-red-700 border-red-300",
      icon: "🔴",
    },

    inactive: {
      badge: "bg-gray-100 text-gray-600 border-gray-300",
      icon: "⚪",
    },
  };

  const currentStatus =
    statusStyle[status.toLowerCase()] || statusStyle.inactive;

  const isAvailable = status.toLowerCase() === "available";

  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      bg-white
      shadow-md
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >
      {/* Top Gradient */}

      <div
        className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-orange-500
        via-orange-500
        to-orange-600
        p-6
        text-white
        "
      >
        {/* Decoration */}

        <div
          className="
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-white/20
          "
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div
              className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white/20
              text-3xl
              backdrop-blur
              "
            >
              🪑
            </div>

            <span
              className="
              rounded-full
              bg-white/20
              px-3
              py-1
              text-sm
              font-semibold
              backdrop-blur
              "
            >
              Table #{table_number}
            </span>
          </div>

          <h2
            className="
            mt-6
            text-3xl
            font-extrabold
            "
          >
            Table {table_number}
          </h2>

          <p className="mt-1 text-orange-100">📍 {location}</p>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        {/* Capacity */}

        <div
          className="
          flex
          items-center
          justify-between
          rounded-2xl
          bg-orange-50
          p-4
          "
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👥</span>

            <span className="text-gray-600">Capacity</span>
          </div>

          <span className="font-bold text-gray-800">{capacity} Persons</span>
        </div>

        {/* Status */}

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Current Status</span>

          <span
            className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            px-4
            py-2
            text-sm
            font-semibold
            ${currentStatus.badge}
            `}
          >
            {currentStatus.icon}

            {status}
          </span>
        </div>

        {/* Button */}

        <button
          disabled={!isAvailable}
          onClick={() => router.push(`/reservation?table=${table_id}`)}
          className={`
          w-full
          rounded-2xl
          py-3.5
          font-bold
          transition-all
          duration-300

          ${
            isAvailable
              ? `
              bg-orange-500
              text-white
              shadow-md
              hover:-translate-y-1
              hover:bg-orange-600
              hover:shadow-lg
              `
              : `
              cursor-not-allowed
              bg-gray-200
              text-gray-500
              `
          }
          `}
        >
          {isAvailable ? "Reserve Table 🚀" : "Currently Unavailable"}
        </button>
      </div>
    </div>
  );
}
