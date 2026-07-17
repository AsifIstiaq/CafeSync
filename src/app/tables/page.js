"use client";

import { useEffect, useState } from "react";
import TableGrid from "./components/TableGrid";

const API = "http://localhost:4000/api/reservation";

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTables();
  }, []);

  async function fetchTables() {
    try {
      const res = await fetch(`${API}/tables`);
      const data = await res.json();

      if (data.success) {
        setTables(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      <div className="bg-orange-500 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold">Reserve a Table</h1>

          <p className="mt-2 text-orange-100">
            Choose your preferred table for dining.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20">Loading tables...</div>
        ) : (
          <TableGrid tables={tables} />
        )}
      </div>
    </div>
  );
}
