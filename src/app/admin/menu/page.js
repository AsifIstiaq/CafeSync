"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:4000/api/menu/items/${editingId}`
      : "http://localhost:4000/api/menu/items";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image_url: "",
    });

    setEditingId(null);
    fetchItems();
  };

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

  const deleteItem = async (id) => {
    await fetch(`http://localhost:4000/api/menu/items/${id}`, {
      method: "DELETE",
    });

    fetchItems();
  };

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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-500">
          Admin Menu Panel
        </h1>
        <p className="text-sm text-gray-500">Manage your cafe menu items</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* FORM SECTION */}
        <div className="lg:w-1/3">
          <div className="bg-white border rounded-xl shadow-sm p-4 lg:sticky lg:top-6">
            <h2 className="font-semibold text-gray-800 mb-3">
              {editingId ? "Update Item" : "Add New Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                value={form.name}
                placeholder="Item name"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />

              <input
                name="description"
                value={form.description}
                placeholder="Description"
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />

              <input
                name="price"
                value={form.price}
                placeholder="Price"
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />

              <input
                name="category"
                value={form.category}
                placeholder="Category"
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />

              <input
                name="image_url"
                value={form.image_url}
                placeholder="Image URL"
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />

              {/* BUTTONS */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium"
                >
                  {editingId ? "Update" : "Add"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-3 text-gray-600 hover:text-black"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* ITEMS GRID */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item[0]}
                className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                {/* IMAGE
                {item[6] && (
                  <div className="relative h-32 w-full">
                    <Image
                      src={item[6]}
                      alt={item[1]}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                )} */}

                {/* CONTENT */}
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800">{item[1]}</h2>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item[2]}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <p className="font-bold text-orange-500">{item[3]} BDT</p>

                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {item[4]}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => startEdit(item)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteItem(item[0])}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {items.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No menu items found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
