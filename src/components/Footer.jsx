import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
      mt-16
      bg-gray-950
      text-gray-300
      "
    >
      <div
        className="
        mx-auto
        grid
        max-w-7xl
        gap-8
        px-6
        py-10
        md:grid-cols-3
        "
      >
        {/* Brand */}

        <div>
          <div
            className="
            flex
            items-center
            gap-2
            text-2xl
            font-extrabold
            text-orange-500
            "
          >
            ☕ CafeSync
          </div>

          <p
            className="
            mt-3
            text-sm
            leading-6
            text-gray-400
            "
          >
            Smart Cafe Ordering and Automation System designed for faster
            ordering, digital payments and better dining experience.
          </p>
        </div>

        {/* Links */}

        <div>
          <h3 className="font-bold text-white">Quick Links</h3>

          <div
            className="
          mt-4
          flex
          flex-col
          gap-2
          text-sm
          "
          >
            <Link href="/menu">🍽️ Menu</Link>

            <Link href="/orders">🛒 Orders</Link>

            <Link href="/reservation">🪑 Reservation</Link>

            <Link href="/feedback">💬 Feedback</Link>
          </div>
        </div>

        {/* Contact */}

        <div>
          <h3 className="font-bold text-white">Contact</h3>

          <div className="mt-4 space-y-2 text-sm">
            <p>📧 support@cafesync.com</p>

            <p>📍 Khulna, Bangladesh</p>

            <p>☎ +880 1234 567890</p>
          </div>
        </div>
      </div>

      <div
        className="
        border-t
        border-gray-800
        py-4
        text-center
        text-sm
        text-gray-500
        "
      >
        © 2026 CafeSync. All rights reserved.
      </div>
    </footer>
  );
}
