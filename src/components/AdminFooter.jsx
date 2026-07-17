export default function AdminFooter() {
  return (
    <footer
      className="
bg-gray-950
text-gray-400
mt-10
"
    >
      <div
        className="
max-w-7xl
mx-auto
px-5
py-8
"
      >
        <div
          className="
flex
flex-col
md:flex-row
items-center
justify-between
gap-4
"
        >
          <div>
            <h2
              className="
text-white
font-bold
text-lg
"
            >
              CafeSync
            </h2>

            <p
              className="
text-sm
mt-1
"
            >
              Smart Cafe Management System
            </p>
          </div>

          <div
            className="
text-sm
text-center
"
          >
            <p>© 2026 CafeSync Admin Panel</p>

            <p
              className="
mt-1
"
            >
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
