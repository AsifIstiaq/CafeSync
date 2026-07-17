"use client";

import { useEffect, useState } from "react";

const API = "http://localhost:4000/api/tables";

export default function TableFormModal({
  show,

  onClose,

  onSuccess,

  editTable,
}) {
  const emptyForm = {
    table_number: "",

    capacity: "",

    status: "available",

    location: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editTable) {
      setForm({
        table_number: editTable[1],

        capacity: editTable[2],

        status: editTable[3],

        location: editTable[4],
      });
    } else {
      setForm(emptyForm);
    }
  }, [editTable, show]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();

    try {
      const isEdit = Boolean(editTable);

      const res = await fetch(
        isEdit ? `${API}/${editTable[0]}` : API,

        {
          method: isEdit ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (data.success) {
        alert(isEdit ? "Table updated" : "Table added");

        onSuccess();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!show) return null;

  return (
    <div
      className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
"
    >
      <div
        className="
bg-white
rounded-xl
shadow-xl
w-full
max-w-md
p-6
"
      >
        <h2 className="text-xl font-bold mb-5">
          {editTable ? "Edit Table" : "Add Table"}
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="table_number"
            type="number"
            placeholder="Table Number"
            value={form.table_number}
            onChange={handleChange}
            className="
w-full
border
rounded-lg
p-2
"
          />

          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            className="
w-full
border
rounded-lg
p-2
"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
w-full
border
rounded-lg
p-2
"
          >
            <option value="available">Available</option>

            <option value="occupied">Occupied</option>

            <option value="inactive">Inactive</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="
w-full
border
rounded-lg
p-2
"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
flex-1
bg-gray-300
py-2
rounded-lg
"
            >
              Cancel
            </button>

            <button
              className="
flex-1
bg-orange-500
text-white
py-2
rounded-lg
"
            >
              {editTable ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
