"use client";

import { useEffect, useState } from "react";

export default function AdminMembership() {
  const [cards, setCards] = useState([]);

  const [form, setForm] = useState({
    phone: "",
    tier: "Silver",
    points: 0,
    expiry_date: "",
  });

  const [editCard, setEditCard] = useState(null);

  const [editForm, setEditForm] = useState({
    tier: "",
    points: "",
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

      setForm({
        phone: "",
        tier: "Silver",
        points: 0,
        expiry_date: "",
      });
    }
  }

  function updateStatus(card) {
    setEditCard(card[0]);

    setEditForm({
      tier: card[3],
      points: card[4],
      expiry_date: new Date(card[6]).toISOString().substring(0, 10),
    });
  }

  async function saveEdit() {
    await fetch(
      `http://localhost:4000/api/membership/admin/update/${editCard}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(editForm),
      },
    );

    setEditCard(null);

    loadCards();
  }

  async function deleteCard(id) {
    if (!confirm("Delete membership?")) return;

    await fetch(`http://localhost:4000/api/membership/admin/delete/${id}`, {
      method: "DELETE",
    });

    loadCards();
  }

  function tierStyle(tier) {
    if (tier === "Gold") {
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }

    if (tier === "Platinum") {
      return "bg-purple-100 text-purple-700 border-purple-300";
    }

    return "bg-gray-100 text-gray-700 border-gray-300";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Membership Management
          </h1>

          <p className="text-gray-500 mt-2">
            Create, manage and monitor customer membership cards.
          </p>
        </div>

        {/* CREATE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Create Membership Card
            </h2>

            <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
              New Card
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                value={form.phone}
                placeholder="Enter customer phone number"
                className="
                mt-1
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
              focus:ring-orange-400
                "
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Membership Tier</label>

              <select
                value={form.tier}
                className="
                mt-1
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-orange-400
                "
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
            </div>

            <div>
              <label className="text-sm text-gray-600">Reward Points</label>

              <input
                value={form.points}
                placeholder="Points"
                className="
                mt-1
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-orange-400
                "
                onChange={(e) =>
                  setForm({
                    ...form,
                    points: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Expiry Date</label>

              <input
                type="date"
                value={form.expiry_date}
                className="
                mt-1
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-orange-400
                "
                onChange={(e) =>
                  setForm({
                    ...form,
                    expiry_date: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            onClick={createCard}
            className="
            mt-6
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            transition
            shadow-sm
            "
          >
            Create Membership
          </button>
        </div>

        {editCard && (
          <div className="bg-white border rounded-2xl p-6 mb-8 shadow">
            <h2 className="text-xl font-bold mb-5">Edit Membership</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <select
                className="border rounded-xl px-4 py-3"
                value={editForm.tier}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    tier: e.target.value,
                  })
                }
              >
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>

              <input
                className="border rounded-xl px-4 py-3"
                type="number"
                value={editForm.points}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    points: e.target.value,
                  })
                }
              />

              <input
                className="border rounded-xl px-4 py-3"
                type="date"
                value={editForm.expiry_date}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    expiry_date: e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={saveEdit}
              className="
mt-5
bg-green-600
text-white
px-6
py-3
rounded-xl
"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* TABLE */}
        <div
          className="
        bg-white
        border
        rounded-2xl
        shadow-sm
        overflow-hidden
        "
        >
          <div className="px-6 py-5 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Customer Membership Cards
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-6 py-4">ID</th>

                  <th className="px-6 py-4">Customer</th>

                  <th className="px-6 py-4">Email</th>

                  <th className="px-6 py-4">Tier</th>

                  <th className="px-6 py-4">Points</th>

                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cards.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="
                      text-center
                      py-10
                      text-gray-500
                      "
                    >
                      No membership cards found
                    </td>
                  </tr>
                ) : (
                  cards.map((card) => (
                    <tr
                      key={card[0]}
                      className="
                      border-t
                      hover:bg-gray-50
                      transition
                      "
                    >
                      <td className="px-6 py-4 font-medium">#{card[0]}</td>

                      <td className="px-6 py-4">{card[1]}</td>

                      <td className="px-6 py-4 text-gray-600">{card[2]}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`
                          inline-flex
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                          border
                          ${tierStyle(card[3])}
                          `}
                        >
                          {card[3]}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-semibold">{card[4]}</td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(card)}
                            className="
                            bg-blue-500
                            hover:bg-blue-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            text-sm
                            font-medium
                            transition
                            "
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteCard(card[0])}
                            className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            text-sm
                            font-medium
                            transition
                            "
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
