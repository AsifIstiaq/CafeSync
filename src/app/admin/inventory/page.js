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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Inventory Management
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage ingredients, stock levels, and reorder alerts
            </p>
          </div>

          <button
            onClick={handleAddClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            + Add Ingredient
          </button>
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="text-gray-500 text-sm animate-pulse">
              Loading inventory...
            </div>
          </div>
        ) : inventory.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-sm">No inventory items found</p>
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
