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
    available: "bg-green-100 text-green-700 border-green-300",

    occupied: "bg-red-100 text-red-700 border-red-300",

    inactive: "bg-gray-100 text-gray-600 border-gray-300",
  };

  const isAvailable = status.toLowerCase() === "available";

  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
      border
      overflow-hidden
      "
    >
      {/* HEADER */}

      <div
        className="
        bg-gradient-to-r
        from-orange-500
        to-orange-400
        p-6
        text-white
        "
      >
        <h2 className="text-3xl font-bold">Table {table_number}</h2>

        <p className="mt-1 text-orange-100">{location}</p>
      </div>

      {/* BODY */}

      <div className="p-6 space-y-5">
        <div className="flex justify-between">
          <span className="text-gray-500">Capacity</span>

          <span className="font-semibold">{capacity} Persons</span>
        </div>

        {/* STATUS */}

        <div>
          <span
            className={`
            inline-flex
            px-4
            py-1
            rounded-full
            text-sm
            font-semibold
            border
            ${statusStyle[status.toLowerCase()]}
            `}
          >
            {status}
          </span>
        </div>

        <button
          disabled={!isAvailable}
          onClick={() => router.push(`/reservation?table=${table_id}`)}
          className={`
          w-full
          py-3
          rounded-xl
          font-semibold
          transition

          ${
            isAvailable
              ? `
            bg-orange-500
            hover:bg-orange-600
            text-white
            `
              : `
            bg-gray-200
            text-gray-500
            cursor-not-allowed
            `
          }

          `}
        >
          {isAvailable ? "Reserve Table" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
