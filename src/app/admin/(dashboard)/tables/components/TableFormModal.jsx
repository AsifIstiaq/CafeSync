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
z-50
flex
items-center
justify-center
bg-black/50
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
"
      >
        {/* HEADER */}

        <div
          className="
bg-gradient-to-r
from-orange-500
to-red-500
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
            {editTable ? "Edit Table" : "Add New Table"}
          </h2>

          <p
            className="
text-orange-100
text-sm
mt-1
"
          >
            Manage cafeteria seating information
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={submit}
          className="
p-6
space-y-5
"
        >
          <div>
            <label
              className="
text-sm
font-semibold
text-gray-700
"
            >
              Table Number
            </label>

            <input
              name="table_number"
              type="number"
              placeholder="Example: 5"
              value={form.table_number}
              onChange={handleChange}
              className="
mt-2
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
transition
"
            />
          </div>

          <div>
            <label
              className="
text-sm
font-semibold
text-gray-700
"
            >
              Capacity
            </label>

            <input
              name="capacity"
              type="number"
              placeholder="Number of seats"
              value={form.capacity}
              onChange={handleChange}
              className="
mt-2
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
transition
"
            />
          </div>

          <div>
            <label
              className="
text-sm
font-semibold
text-gray-700
"
            >
              Table Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="
mt-2
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
bg-white
"
            >
              <option value="available">Available</option>

              <option value="occupied">Occupied</option>

              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label
              className="
text-sm
font-semibold
text-gray-700
"
            >
              Location
            </label>

            <input
              name="location"
              placeholder="Example: Ground Floor"
              value={form.location}
              onChange={handleChange}
              className="
mt-2
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
transition
"
            />
          </div>

          {/* BUTTONS */}

          <div
            className="
flex
gap-3
pt-3
"
          >
            <button
              type="button"
              onClick={onClose}
              className="
flex-1
bg-gray-100
hover:bg-gray-200
text-gray-700
font-semibold
py-3
rounded-xl
transition
"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
flex-1
bg-orange-500
hover:bg-orange-600
text-white
font-semibold
py-3
rounded-xl
transition
shadow-md
"
            >
              {editTable ? "Update Table" : "Save Table"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
