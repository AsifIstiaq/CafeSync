"use client";

export default function InventoryTable({
  inventory,
  loading,
  onDelete,
  onEdit,
}) {
  if (loading) {
    return (
      <div
        className="
      flex
      justify-center
      items-center
      py-12
      text-gray-500
      animate-pulse
      "
      >
        Loading inventory...
      </div>
    );
  }

  return (
    <div>
      {/* DESKTOP TABLE */}

      <div
        className="
hidden
md:block
overflow-x-auto
"
      >
        <table
          className="
min-w-full
border-collapse
"
        >
          <thead>
            <tr
              className="
bg-slate-100
text-gray-600
text-xs
uppercase
tracking-wider
"
            >
              <th
                className="
px-5
py-4
text-left
"
              >
                ID
              </th>

              <th
                className="
px-5
py-4
text-left
"
              >
                Ingredient
              </th>

              <th
                className="
px-5
py-4
text-left
"
              >
                Stock
              </th>

              <th
                className="
px-5
py-4
text-left
"
              >
                Unit
              </th>

              <th
                className="
px-5
py-4
text-left
"
              >
                Reorder Level
              </th>

              <th
                className="
px-5
py-4
text-left
"
              >
                Status
              </th>

              <th
                className="
px-5
py-4
text-left
"
              >
                Updated
              </th>

              <th
                className="
px-5
py-4
text-left
"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="
text-center
py-12
text-gray-400
"
                >
                  No inventory items found
                </td>
              </tr>
            ) : (
              inventory.map((item) => {
                const isLowStock = item[2] <= item[4];

                return (
                  <tr
                    key={item[0]}
                    className="
border-b
hover:bg-slate-50
transition
"
                  >
                    <td
                      className="
px-5
py-4
font-medium
text-gray-500
"
                    >
                      #{item[0]}
                    </td>

                    <td
                      className="
px-5
py-4
font-semibold
text-gray-800
"
                    >
                      {item[1]}
                    </td>

                    <td
                      className="
px-5
py-4
"
                    >
                      <span
                        className="
font-bold
text-gray-800
"
                      >
                        {item[2]}
                      </span>
                    </td>

                    <td
                      className="
px-5
py-4
text-gray-600
"
                    >
                      {item[3]}
                    </td>

                    <td
                      className="
px-5
py-4
text-gray-600
"
                    >
                      {item[4]}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <span
                        className={`
inline-flex
items-center
px-3
py-1
rounded-full
text-xs
font-semibold

${isLowStock ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}

`}
                      >
                        <span
                          className="
mr-1
"
                        >
                          ●
                        </span>

                        {isLowStock ? "Low Stock" : "Available"}
                      </span>
                    </td>

                    <td
                      className="
px-5
py-4
text-sm
text-gray-500
"
                    >
                      {item[5] ? new Date(item[5]).toLocaleDateString() : "-"}
                    </td>

                    {/* ACTIONS */}

                    <td
                      className="
px-5
py-4
"
                    >
                      <div
                        className="
flex
gap-2
"
                      >
                        <button
                          onClick={() => onEdit(item)}
                          className="
px-4
py-2
rounded-xl
text-xs
font-medium
bg-yellow-500
hover:bg-yellow-600
text-white
transition
"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(item[0])}
                          className="
px-4
py-2
rounded-xl
text-xs
font-medium
bg-red-500
hover:bg-red-600
text-white
transition
"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}

      <div
        className="
md:hidden
space-y-4
"
      >
        {inventory.length === 0 ? (
          <div
            className="
text-center
py-10
text-gray-400
"
          >
            No inventory found
          </div>
        ) : (
          inventory.map((item) => {
            const isLowStock = item[2] <= item[4];

            return (
              <div
                key={item[0]}
                className="
bg-white
border
rounded-2xl
p-5
shadow-sm
"
              >
                <div
                  className="
flex
justify-between
items-start
"
                >
                  <div>
                    <h3
                      className="
font-bold
text-gray-800
"
                    >
                      {item[1]}
                    </h3>

                    <p
                      className="
text-sm
text-gray-500
mt-1
"
                    >
                      ID #{item[0]}
                    </p>
                  </div>

                  <span
                    className={`
px-3
py-1
rounded-full
text-xs
font-semibold

${isLowStock ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}

`}
                  >
                    {isLowStock ? "LOW" : "OK"}
                  </span>
                </div>

                <div
                  className="
grid
grid-cols-2
gap-3
mt-5
text-sm
"
                >
                  <div>
                    <p className="text-gray-400">Quantity</p>

                    <p className="font-semibold">
                      {item[2]} {item[3]}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Reorder</p>

                    <p className="font-semibold">{item[4]}</p>
                  </div>
                </div>

                <p
                  className="
text-xs
text-gray-400
mt-4
"
                >
                  Updated: {item[5] ? new Date(item[5]).toLocaleString() : "-"}
                </p>

                <div
                  className="
flex
gap-3
mt-5
"
                >
                  <button
                    onClick={() => onEdit(item)}
                    className="
flex-1
bg-yellow-500
hover:bg-yellow-600
text-white
rounded-xl
py-2
text-sm
"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(item[0])}
                    className="
flex-1
bg-red-500
hover:bg-red-600
text-white
rounded-xl
py-2
text-sm
"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
