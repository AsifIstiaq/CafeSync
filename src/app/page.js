"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col">
      {/* NAVBAR */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <h1 className="text-2xl font-bold text-orange-600">CafeSync</h1>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-lg border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Smart Cafeteria Ordering &
            <span className="text-orange-500"> Automation System</span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Order food, track queues, manage tables, and experience a modern
            digital cafeteria system built for speed and efficiency.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-600 transition"
            >
              Get Started
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 border border-orange-500 text-orange-600 rounded-xl hover:bg-orange-500 hover:text-white transition"
            >
              Create Account
            </Link>
          </div>

          {/* FEATURES */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-white rounded-xl shadow-sm border">
              <h3 className="font-semibold text-orange-500">Fast Ordering</h3>
              <p className="text-sm text-gray-600">
                Place orders instantly with real-time updates.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm border">
              <h3 className="font-semibold text-orange-500">Smart Queue</h3>
              <p className="text-sm text-gray-600">
                Token-based order tracking system.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm border">
              <h3 className="font-semibold text-orange-500">Digital Payment</h3>
              <p className="text-sm text-gray-600">
                Secure and fast payment management.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} CafeSync. All rights reserved.
      </footer>
    </div>
  );
}
