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
    <div
      className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/60
backdrop-blur-sm
px-4
"
    >
      <div
        className="
bg-white
w-full
max-w-lg
rounded-3xl
shadow-2xl
overflow-hidden
animate-in
fade-in
zoom-in
duration-200
"
      >
        {/* HEADER */}

        <div
          className="
bg-gradient-to-r
from-blue-600
to-indigo-600
p-6
text-white
"
        >
          <h2
            className="
text-2xl
font-bold
"
          >
            {isEdit ? "Update Ingredient" : "Add New Ingredient"}
          </h2>

          <p
            className="
text-blue-100
text-sm
mt-1
"
          >
            Manage cafe inventory information
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
p-6
space-y-5
"
        >
          {/* NAME */}

          <div>
            <label
              className="
text-sm
font-medium
text-gray-700
"
            >
              Ingredient Name
            </label>

            <input
              name="ingredient_name"
              value={form.ingredient_name}
              onChange={handleChange}
              placeholder="Example: Coffee Beans"
              className="
mt-2
w-full
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-400
transition
"
            />
          </div>

          {/* QUANTITY */}

          <div
            className="
grid
grid-cols-2
gap-4
"
          >
            <div>
              <label
                className="
text-sm
font-medium
text-gray-700
"
              >
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="100"
                className="
mt-2
w-full
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-400
"
              />
            </div>

            <div>
              <label
                className="
text-sm
font-medium
text-gray-700
"
              >
                Unit
              </label>

              <input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="Kg / L / pcs"
                className="
mt-2
w-full
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-400
"
              />
            </div>
          </div>

          {/* REORDER LEVEL */}

          <div>
            <label
              className="
text-sm
font-medium
text-gray-700
"
            >
              Reorder Level
            </label>

            <input
              type="number"
              name="reorder_level"
              value={form.reorder_level}
              onChange={handleChange}
              placeholder="10"
              className="
mt-2
w-full
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-400
"
            />

            <p
              className="
text-xs
text-gray-500
mt-2
"
            >
              You will receive alerts when stock reaches this level.
            </p>
          </div>

          {/* ACTION BUTTONS */}

          <div
            className="
flex
justify-end
gap-3
pt-4
border-t
"
          >
            <button
              type="button"
              onClick={onClose}
              className="
px-5
py-3
rounded-xl
bg-gray-100
hover:bg-gray-200
text-gray-700
font-medium
transition
"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="
px-6
py-3
rounded-xl
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
transition
disabled:opacity-50
"
            >
              {loading
                ? "Processing..."
                : isEdit
                  ? "Update Item"
                  : "Save Ingredient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
