"use client";

import { useEffect, useState } from "react";
import InventoryTable from "./components/InventoryTable";
import InventoryFormModal from "./components/InventoryFormModal";

const API = "http://localhost:4000/api/inventory";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    try {
      setLoading(true);

      const res = await fetch(API);

      const data = await res.json();

      if (data.success) {
        setInventory(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleAddClick() {
    setEditItem(null);
    setShowModal(true);
  }

  function handleEditClick(item) {
    setEditItem(item);
    setShowModal(true);
  }

  async function handleDelete(id) {
    const ok = confirm("Are you sure you want to delete this item?");

    if (!ok) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchInventory();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      {/* PAGE HEADER */}

      <div
        className="
bg-gradient-to-r
from-blue-600
to-indigo-600
rounded-3xl
shadow-lg
p-6
md:p-8
mb-8
text-white
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
              Inventory Management
            </h1>

            <p
              className="
mt-2
text-blue-100
"
            >
              Manage ingredients, stock levels and reorder alerts
            </p>
          </div>

          <button
            onClick={handleAddClick}
            className="
bg-white
text-blue-600
font-semibold
px-6
py-3
rounded-xl
shadow
hover:bg-blue-50
transition
"
          >
            + Add Ingredient
          </button>
        </div>
      </div>

      {/* STATISTICS */}

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
p-5
shadow-sm
border
"
        >
          <p className="text-gray-500 text-sm">Total Ingredients</p>

          <h2
            className="
text-3xl
font-bold
text-gray-800
mt-2
"
          >
            {inventory.length}
          </h2>
        </div>

        <div
          className="
bg-white
rounded-2xl
p-5
shadow-sm
border
"
        >
          <p className="text-gray-500 text-sm">Available Stock</p>

          <h2
            className="
text-3xl
font-bold
text-green-600
mt-2
"
          >
            {inventory.filter((item) => item.quantity > 0).length}
          </h2>
        </div>

        <div
          className="
bg-white
rounded-2xl
p-5
shadow-sm
border
"
        >
          <p className="text-gray-500 text-sm">Low Stock Alert</p>

          <h2
            className="
text-3xl
font-bold
text-red-500
mt-2
"
          >
            {inventory.filter((item) => item.quantity <= 5).length}
          </h2>
        </div>
      </div>

      {/* TABLE AREA */}

      <div
        className="
bg-white
rounded-3xl
shadow-sm
border
overflow-hidden
"
      >
        <div
          className="
px-6
py-5
border-b
"
        >
          <h2
            className="
text-xl
font-bold
text-gray-800
"
          >
            Inventory List
          </h2>

          <p
            className="
text-sm
text-gray-500
mt-1
"
          >
            View and manage all cafe ingredients
          </p>
        </div>

        <div className="p-5">
          {loading ? (
            <div
              className="
flex
justify-center
items-center
py-16
"
            >
              <div
                className="
text-gray-500
animate-pulse
"
              >
                Loading inventory...
              </div>
            </div>
          ) : inventory.length === 0 ? (
            <div
              className="
py-16
text-center
"
            >
              <div
                className="
text-5xl
mb-4
"
              >
                📦
              </div>

              <h3
                className="
font-semibold
text-gray-700
"
              >
                No Inventory Items Found
              </h3>

              <p
                className="
text-sm
text-gray-500
mt-2
"
              >
                Start adding ingredients for your cafe.
              </p>
            </div>
          ) : (
            <InventoryTable
              inventory={inventory}
              loading={loading}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* MODAL */}

      <InventoryFormModal
        show={showModal}
        editItem={editItem}
        onClose={() => {
          setShowModal(false);

          setEditItem(null);
        }}
        onSuccess={() => {
          fetchInventory();

          setShowModal(false);

          setEditItem(null);
        }}
      />
    </div>
  );
}
