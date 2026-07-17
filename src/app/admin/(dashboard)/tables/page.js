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
        className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      ${colors[status] || "bg-gray-100 text-gray-600"}
      `}
      >
        {status}
      </span>
    );
  }

  return (
    <div
      className="
min-h-screen
bg-slate-50
p-5
md:p-8
"
    >
      {/* HEADER */}

      <div
        className="
bg-gradient-to-r
from-orange-500
to-red-500
rounded-3xl
p-6
md:p-8
shadow-lg
text-white
mb-8
"
      >
        <div
          className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-5
"
        >
          <div>
            <h1
              className="
text-3xl
md:text-4xl
font-bold
"
            >
              Table Management
            </h1>

            <p
              className="
text-orange-100
mt-2
"
            >
              Manage cafeteria tables and availability
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="
bg-white
text-orange-600
font-semibold
px-6
py-3
rounded-xl
shadow
hover:bg-orange-50
transition
"
          >
            + Add Table
          </button>
        </div>
      </div>

      {/* STAT CARDS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-3
gap-5
mb-8
"
      >
        <div
          className="
bg-white
rounded-2xl
border
shadow-sm
p-5
"
        >
          <p
            className="
text-gray-500
text-sm
"
          >
            Total Tables
          </p>

          <h2
            className="
text-3xl
font-bold
text-gray-800
mt-2
"
          >
            {tables.length}
          </h2>
        </div>

        <div
          className="
bg-white
rounded-2xl
border
shadow-sm
p-5
"
        >
          <p
            className="
text-gray-500
text-sm
"
          >
            Available
          </p>

          <h2
            className="
text-3xl
font-bold
text-green-500
mt-2
"
          >
            {tables.filter((t) => t[3] === "available").length}
          </h2>
        </div>

        <div
          className="
bg-white
rounded-2xl
border
shadow-sm
p-5
"
        >
          <p
            className="
text-gray-500
text-sm
"
          >
            Occupied
          </p>

          <h2
            className="
text-3xl
font-bold
text-red-500
mt-2
"
          >
            {tables.filter((t) => t[3] === "occupied").length}
          </h2>
        </div>
      </div>

      {/* CONTENT */}

      {loading ? (
        <div
          className="
bg-white
rounded-3xl
p-12
text-center
shadow-sm
border
"
        >
          <p
            className="
text-gray-500
animate-pulse
"
          >
            Loading tables...
          </p>
        </div>
      ) : tables.length === 0 ? (
        <div
          className="
bg-white
rounded-3xl
p-12
text-center
border
"
        >
          <div
            className="
text-5xl
"
          >
            🪑
          </div>

          <h3
            className="
mt-4
font-semibold
text-gray-700
"
          >
            No Tables Found
          </h3>

          <p
            className="
text-gray-500
mt-2
"
          >
            Add tables to manage cafeteria seating.
          </p>
        </div>
      ) : (
        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
"
        >
          {tables.map((table) => (
            <div
              key={table[0]}
              className="
bg-white
rounded-3xl
border
shadow-sm
p-6
hover:shadow-xl
transition
"
            >
              <div
                className="
flex
justify-between
items-start
"
              >
                <div>
                  <p
                    className="
text-sm
text-gray-500
"
                  >
                    Table
                  </p>

                  <h2
                    className="
text-2xl
font-bold
text-gray-800
"
                  >
                    #{table[1]}
                  </h2>
                </div>

                <StatusBadge status={table[3]} />
              </div>

              <div
                className="
mt-6
space-y-4
"
              >
                <div
                  className="
flex
items-center
justify-between
bg-slate-50
rounded-xl
p-3
"
                >
                  <span
                    className="
text-gray-500
text-sm
"
                  >
                    Capacity
                  </span>

                  <span
                    className="
font-bold
text-gray-800
"
                  >
                    👥 {table[2]} people
                  </span>
                </div>

                <div
                  className="
flex
items-center
justify-between
bg-slate-50
rounded-xl
p-3
"
                >
                  <span
                    className="
text-gray-500
text-sm
"
                  >
                    Location
                  </span>

                  <span
                    className="
font-semibold
text-gray-800
"
                  >
                    {table[4]}
                  </span>
                </div>
              </div>

              <div
                className="
flex
gap-3
mt-6
"
              >
                <button
                  onClick={() => handleEdit(table)}
                  className="
flex-1
bg-blue-500
hover:bg-blue-600
text-white
py-3
rounded-xl
font-medium
transition
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
py-3
rounded-xl
font-medium
transition
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
