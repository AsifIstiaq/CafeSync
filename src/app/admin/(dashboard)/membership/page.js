"use client";

import { useEffect, useState } from "react";

export default function AdminMembership() {
  const [cards, setCards] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    tier: "Silver",
    points: 0,
    expiry_date: "",
  });

  useEffect(() => {
    loadCards();
  }, []);

  async function loadCards() {
    const res = await fetch("http://localhost:4000/api/membership/admin/all");

    const data = await res.json();

    if (data.success) {
      setCards(data.data);
    }
  }

  async function createCard() {
    const res = await fetch(
      "http://localhost:4000/api/membership/admin/create",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      },
    );

    const data = await res.json();

    if (data.success) {
      alert("Membership created");

      loadCards();
    }
  }

  async function updateStatus(card) {
    const tier = prompt("Enter Tier", card[3]);

    if (!tier) return;

    await fetch(
      `http://localhost:4000/api/membership/admin/update/${card[0]}`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          tier,

          points: card[4],

          expiry_date: new Date(card[6]).toISOString().substring(0, 10),
        }),
      },
    );

    loadCards();
  }

  async function deleteCard(id) {
    if (!confirm("Delete membership?")) return;

    await fetch(
      `http://localhost:4000/api/membership/admin/delete/${id}`,

      {
        method: "DELETE",
      },
    );

    loadCards();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Membership Card Management</h1>

        <div className="bg-white p-5 rounded-xl shadow border mb-8">
          <h2 className="font-bold mb-4">Create Membership Card</h2>

          <div className="grid md:grid-cols-4 gap-3">
            <input
              placeholder="User ID"
              className="border p-2 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  user_id: e.target.value,
                })
              }
            />

            <select
              className="border p-2 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  tier: e.target.value,
                })
              }
            >
              <option>Silver</option>

              <option>Gold</option>

              <option>Platinum</option>
            </select>

            <input
              placeholder="Points"
              className="border p-2 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  points: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="border p-2 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  expiry_date: e.target.value,
                })
              }
            />
          </div>

          <button
            onClick={createCard}
            className="
mt-4
bg-orange-500
text-white
px-5
py-2
rounded
"
          >
            Create
          </button>
        </div>

        <div className="bg-white rounded-xl shadow border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ID</th>

                <th className="p-3">Customer</th>

                <th className="p-3">Email</th>

                <th className="p-3">Tier</th>

                <th className="p-3">Points</th>

                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {cards.map((card) => (
                <tr key={card[0]} className="border-t">
                  <td className="p-3">{card[0]}</td>

                  <td className="p-3">{card[1]}</td>

                  <td className="p-3">{card[2]}</td>

                  <td className="p-3">{card[3]}</td>

                  <td className="p-3">{card[4]}</td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => updateStatus(card)}
                      className="
bg-blue-500
text-white
px-3
py-1
rounded
"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCard(card[0])}
                      className="
bg-red-500
text-white
px-3
py-1
rounded
"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
