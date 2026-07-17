"use client";

import TableCard from "./TableCard";

export default function TableGrid({ tables }) {
  if (tables.length === 0) {
    return (
      <div className="text-center text-gray-500">No tables available.</div>
    );
  }

  return (
    <div
      className="grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    gap-6"
    >
      {tables.map((table) => (
        <TableCard key={table[0]} table={table} />
      ))}
    </div>
  );
}
