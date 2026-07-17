"use client";

import TableCard from "./TableCard";

export default function TableGrid({ tables }) {
  if (tables.length === 0) {
    return (
      <div
        className="
        flex
        min-h-[300px]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        bg-white
        p-10
        text-center
        shadow-md
        "
      >
        <div className="mb-5 text-6xl">🪑</div>

        <h2
          className="
          text-xl
          font-bold
          text-gray-800
          "
        >
          No Tables Available
        </h2>

        <p
          className="
          mt-2
          max-w-md
          text-gray-500
          "
        >
          There are currently no tables available for reservation. Please check
          again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid Header */}

      <div
        className="
        mb-6
        flex
        flex-col
        justify-between
        gap-3
        sm:flex-row
        sm:items-center
        "
      >
        <div>
          <h2
            className="
            text-2xl
            font-extrabold
            text-gray-800
            "
          >
            Available Tables
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose a table that matches your group size.
          </p>
        </div>

        <div
          className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-orange-100
          px-4
          py-2
          text-sm
          font-semibold
          text-orange-600
          "
        >
          🪑 {tables.length} Tables Found
        </div>
      </div>

      {/* Table Cards */}

      <div
        className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        "
      >
        {tables.map((table) => (
          <TableCard key={table[0]} table={table} />
        ))}
      </div>
    </div>
  );
}
