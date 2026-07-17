"use client";

import { useEffect, useState } from "react";
import TableFormModal from "./components/TableFormModal";

const API = "http://localhost:4000/api/tables";

export default function TablesPage() {
  const [tables, setTables] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editTable, setEditTable] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  async function fetchTables() {
    try {
      setLoading(true);

      const res = await fetch(API);

      const data = await res.json();

      if (data.success) {
        setTables(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    setEditTable(null);

    setShowModal(true);
  }

  function handleEdit(table) {
    setEditTable(table);

    setShowModal(true);
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Delete this table?");

    if (!confirmDelete) return;

    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      fetchTables();
    } else {
      alert(data.message);
    }
  }

  function StatusBadge({ status }) {
    const colors = {
      available: "bg-green-100 text-green-700",

      occupied: "bg-red-100 text-red-700",

      inactive: "bg-gray-200 text-gray-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          colors[status] || "bg-gray-100"
        }`}
      >
        {status}
      </span>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Table Management</h1>

          <p className="text-gray-500">
            Manage cafeteria tables and availability
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="
        bg-orange-500
        hover:bg-orange-600
        text-white
        px-5
        py-2
        rounded-lg
        shadow
        "
        >
          + Add Table
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading tables...</div>
      ) : (
        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-5
"
        >
          {tables.map((table) => (
            <div
              key={table[0]}
              className="
bg-white
rounded-xl
shadow
border
p-5
hover:shadow-lg
transition
"
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Table {table[1]}</h2>

                <StatusBadge status={table[3]} />
              </div>

              <div className="mt-4 space-y-2 text-gray-600">
                <p>
                  Capacity:
                  <span className="font-semibold"> {table[2]} people</span>
                </p>

                <p>
                  Location:
                  <span className="font-semibold"> {table[4]}</span>
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleEdit(table)}
                  className="
flex-1
bg-blue-500
hover:bg-blue-600
text-white
py-2
rounded-lg
"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(table[0])}
                  className="
flex-1
bg-red-500
hover:bg-red-600
text-white
py-2
rounded-lg
"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TableFormModal
        show={showModal}
        editTable={editTable}
        onClose={() => {
          setShowModal(false);

          setEditTable(null);
        }}
        onSuccess={() => {
          fetchTables();

          setShowModal(false);

          setEditTable(null);
        }}
      />
    </div>
  );
}
