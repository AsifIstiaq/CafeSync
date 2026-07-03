"use client";

export default function InventoryTable({
  inventory,
  loading,
  onDelete,
  onEdit,
}) {
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading inventory...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Ingredient</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-left">Unit</th>
            <th className="px-4 py-3 text-left">Reorder</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Last Updated</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="text-sm text-gray-700">
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-10 text-gray-400">
                No inventory found
              </td>
            </tr>
          ) : (
            inventory.map((item) => {
              const isLowStock = item[2] <= item[4];

              return (
                <tr
                  key={item[0]}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{item[0]}</td>

                  <td className="px-4 py-3 font-medium">{item[1]}</td>

                  <td className="px-4 py-3">{item[2]}</td>

                  <td className="px-4 py-3">{item[3]}</td>

                  <td className="px-4 py-3">{item[4]}</td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isLowStock
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {isLowStock ? "LOW STOCK" : "OK"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {item[5] ? new Date(item[5]).toLocaleString() : "-"}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1 text-xs rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(item[0])}
                      className="px-3 py-1 text-xs rounded-md bg-red-500 hover:bg-red-600 text-white transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
