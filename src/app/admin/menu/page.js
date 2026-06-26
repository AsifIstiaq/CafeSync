"use client";

import { useState, useEffect } from "react";

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
  });

  // AUTH CHECK
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      window.location.href = "/login";
    }
  }, []);

  // FETCH ITEMS
  const fetchItems = async () => {
    const res = await fetch("http://localhost:4000/api/menu/items");
    const data = await res.json();
    setItems(data.data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      await fetch(`http://localhost:4000/api/menu/items/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setEditingId(null);
    } else {
      // CREATE
      await fetch("http://localhost:4000/api/menu/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    // RESET FORM
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image_url: "",
    });

    fetchItems();
  };

  // START EDIT
  const startEdit = (item) => {
    setEditingId(item[0]);

    setForm({
      name: item[1] || "",
      description: item[2] || "",
      price: item[3] || "",
      category: item[4] || "",
      image_url: item[6] || "",
    });
  };

  // DELETE
  const deleteItem = async (id) => {
    await fetch(`http://localhost:4000/api/menu/items/${id}`, {
      method: "DELETE",
    });

    fetchItems();
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image_url: "",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">
        Admin Menu Panel
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-2 mb-6">
        <input
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="image_url"
          value={form.image_url}
          placeholder="Image URL"
          onChange={handleChange}
          className="border p-2"
        />

        <div className="flex gap-2">
          <button className="bg-orange-500 text-white p-2 rounded">
            {editingId ? "Update Item" : "Add Item"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item[0]}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{item[1]}</h2>
              <p>{item[3]} BDT</p>
              <p className="text-sm text-gray-500">{item[4]}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startEdit(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteItem(item[0])}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
