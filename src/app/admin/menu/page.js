"use client";

import { useState, useEffect } from "react";

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      window.location.href = "/login";
    }
  }, []);

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

  const addItem = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:4000/api/menu/items", {
      method: "POST",
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

    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:4000/api/menu/items/${id}`, {
      method: "DELETE",
    });

    fetchItems();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">
        Admin Menu Panel
      </h1>

      {/* FORM */}
      <form onSubmit={addItem} className="grid gap-2 mb-6">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="image_url"
          placeholder="Image URL"
          onChange={handleChange}
          className="border p-2"
        />

        <button className="bg-orange-500 text-white p-2 rounded">
          Add Item
        </button>
      </form>

      {/* LIST */}
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item[0]}
            className="border p-3 rounded flex justify-between"
          >
            <div>
              <h2 className="font-bold">{item[1]}</h2>
              <p>{item[3]} BDT</p>
              <p className="text-sm text-gray-500">{item[4]}</p>
            </div>

            <button
              onClick={() => deleteItem(item[0])}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
