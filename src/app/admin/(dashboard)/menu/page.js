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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:4000/api/menu/items/${editingId}`
      : "http://localhost:4000/api/menu/items";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
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
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      {/* HEADER */}

      <div className="mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold">
            CafeSync Menu Management
          </h1>

          <p className="mt-2 text-orange-100">
            Create, update and manage cafe menu items
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[350px_1fr] gap-8">
        {/* FORM */}

        <div>
          <div
            className="
bg-white 
rounded-3xl 
shadow-md
border
p-6
lg:sticky
lg:top-6
"
          >
            <h2
              className="
text-xl
font-bold
text-gray-800
mb-5
"
            >
              {editingId ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Food name"
                className="
w-full
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="
w-full
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
"
              />

              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price (BDT)"
                className="
w-full
rounded-xl
border
px-4
py-3
"
              />

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="
w-full
rounded-xl
border
px-4
py-3
"
              />

              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="Image URL"
                className="
w-full
rounded-xl
border
px-4
py-3
"
              />

              <div className="flex gap-3 pt-3">
                <button
                  className="
flex-1
bg-orange-500
hover:bg-orange-600
text-white
rounded-xl
py-3
font-semibold
transition
"
                >
                  {editingId ? "Update Item" : "Add Item"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="
px-5
rounded-xl
border
hover:bg-gray-100
"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* ITEMS */}

        <div>
          {items.length > 0 ? (
            <div
              className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
"
            >
              {items.map((item) => (
                <div
                  key={item[0]}
                  className="
bg-white
rounded-3xl
overflow-hidden
border
shadow-sm
hover:shadow-xl
transition
group
"
                >
                  {/* {item[6] && (
                    <div className="relative h-44">
                      <Image
                        src={item[6]}
                        alt={item[1]}
                        fill
                        className="
object-cover
group-hover:scale-105
transition
"
                      />
                    </div>
                  )} */}

                  <div className="p-5">
                    <div className="flex justify-between">
                      <h3
                        className="
font-bold
text-lg
text-gray-800
"
                      >
                        {item[1]}
                      </h3>

                      <span
                        className="
text-xs
bg-orange-100
text-orange-600
px-3
py-1
rounded-full
"
                      >
                        {item[4]}
                      </span>
                    </div>

                    <p
                      className="
text-gray-500
text-sm
mt-3
line-clamp-2
"
                    >
                      {item[2]}
                    </p>

                    <div
                      className="
mt-5
flex
justify-between
items-center
"
                    >
                      <span
                        className="
text-xl
font-bold
text-orange-500
"
                      >
                        ৳ {item[3]}
                      </span>
                    </div>

                    <div
                      className="
flex
gap-3
mt-5
"
                    >
                      <button
                        onClick={() => startEdit(item)}
                        className="
flex-1
bg-blue-500
hover:bg-blue-600
text-white
rounded-xl
py-2
"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteItem(item[0])}
                        className="
flex-1
bg-red-500
hover:bg-red-600
text-white
rounded-xl
py-2
"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="
bg-white
rounded-3xl
p-10
text-center
shadow
"
            >
              <h3 className="text-xl font-bold text-gray-700">
                No Menu Items Found
              </h3>

              <p className="text-gray-500 mt-2">
                Start adding delicious items to your cafe menu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
