"use client";

import { useEffect, useState } from "react";

export default function InventoryFormModal({
  show,
  onClose,
  onSuccess,
  editItem,
}) {
  const API = "http://localhost:4000/api/inventory";

  const emptyForm = {
    ingredient_name: "",
    quantity: "",
    unit: "",
    reorder_level: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editItem) {
      setForm({
        ingredient_name: editItem[1],
        quantity: editItem[2],
        unit: editItem[3],
        reorder_level: editItem[4],
      });
    } else {
      setForm(emptyForm);
    }
  }, [editItem, show]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const isEdit = !!editItem;

      const url = isEdit ? `${API}/${editItem[0]}` : API;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setForm(emptyForm);
        onSuccess();
        onClose();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!show) return null;

  const isEdit = !!editItem;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? "Edit Ingredient" : "Add Ingredient"}
          </h2>
          <p className="text-sm text-gray-500">Fill all required fields</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="ingredient_name"
            value={form.ingredient_name}
            onChange={handleChange}
            placeholder="Ingredient name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="unit"
            value={form.unit}
            onChange={handleChange}
            placeholder="Unit (Kg, L, pcs)"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="reorder_level"
            value={form.reorder_level}
            onChange={handleChange}
            placeholder="Reorder level"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-50"
            >
              {loading ? "Processing..." : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
