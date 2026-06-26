"use client";

import { useEffect, useState } from "react";

export default function MenuPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/menu/items")
      .then((res) => res.json())
      .then((data) => setItems(data.data || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Cafe Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item[0]} className="border p-4 rounded-xl shadow">
            <h2 className="font-bold text-lg">{item[1]}</h2>
            <p className="text-gray-500">{item[2]}</p>
            <p className="text-orange-500 font-semibold">{item[3]} BDT</p>
            <p className="text-sm">Category: {item[4]}</p>

            <p className={item[5] === 1 ? "text-green-500" : "text-red-500"}>
              {item[5] === 1 ? "Available" : "Not Available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
