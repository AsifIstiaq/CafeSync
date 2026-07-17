"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-orange-100/60 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg text-white shadow-lg">
              ☕
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Cafe<span className="text-orange-500">Sync</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-orange-500 px-5 py-2 font-medium text-orange-600 transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-orange-500 px-5 py-2 font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-lg"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-14 px-6 py-16 md:flex-row md:px-10 lg:py-24">
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
              Smart Cafeteria Platform
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-800 md:text-5xl lg:text-6xl">
              Smart Cafeteria Ordering &
              <span className="text-orange-500"> Automation System</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Order food effortlessly, monitor queue status, manage cafeteria
              tables, and enjoy a seamless digital dining experience designed
              for speed, convenience, and efficiency.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/login"
                className="rounded-2xl bg-orange-500 px-8 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-orange-600"
              >
                Get Started
              </Link>

              <Link
                href="/register"
                className="rounded-2xl border border-orange-500 px-8 py-3 text-center font-semibold text-orange-600 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-orange-500 hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-1 justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Card */}
              <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-orange-200">
                <h3 className="mb-6 text-xl font-bold text-gray-800">
                  Today's Dashboard
                </h3>

                <div className="space-y-5">
                  <div className="flex items-center justify-between rounded-2xl bg-orange-50 p-4">
                    <div>
                      <p className="text-sm text-gray-500">Today's Orders</p>
                      <p className="text-2xl font-bold text-gray-800">128</p>
                    </div>
                    <div className="text-3xl">🍽️</div>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-orange-50 p-4">
                    <div>
                      <p className="text-sm text-gray-500">Queue Status</p>
                      <p className="font-semibold text-green-600">Running</p>
                    </div>
                    <div className="text-3xl">⏱️</div>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-orange-50 p-4">
                    <div>
                      <p className="text-sm text-gray-500">Active Tables</p>
                      <p className="text-2xl font-bold text-gray-800">18</p>
                    </div>
                    <div className="text-3xl">🪑</div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-10 top-8 hidden rounded-2xl border bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 lg:block">
                <div className="text-2xl">⚡</div>
                <p className="mt-2 text-sm font-semibold">Fast Ordering</p>
              </div>

              <div className="absolute -right-10 top-40 hidden rounded-2xl border bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 lg:block">
                <div className="text-2xl">🕒</div>
                <p className="mt-2 text-sm font-semibold">Smart Queue</p>
              </div>

              <div className="absolute bottom-0 left-12 hidden rounded-2xl border bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 lg:block">
                <div className="text-2xl">💳</div>
                <p className="mt-2 text-sm font-semibold">Secure Payment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border-t-4 border-orange-500 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                ⚡
              </div>

              <h3 className="text-xl font-bold text-gray-800">Fast Ordering</h3>

              <p className="mt-3 text-gray-600">
                Place food orders instantly with real-time updates and quick
                confirmation.
              </p>
            </div>

            <div className="rounded-3xl border-t-4 border-orange-500 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                🕒
              </div>

              <h3 className="text-xl font-bold text-gray-800">Smart Queue</h3>

              <p className="mt-3 text-gray-600">
                Monitor queue positions and receive live updates without waiting
                in line.
              </p>
            </div>

            <div className="rounded-3xl border-t-4 border-orange-500 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                💳
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                Digital Payment
              </h3>

              <p className="mt-3 text-gray-600">
                Secure digital payments with a smooth checkout experience.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-4xl font-bold text-orange-500">50+</h3>
              <p className="mt-2 text-gray-600">Daily Orders</p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-4xl font-bold text-orange-500">99%</h3>
              <p className="mt-2 text-gray-600">Customer Satisfaction</p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-4xl font-bold text-orange-500">24/7</h3>
              <p className="mt-2 text-gray-600">Availability</p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-4xl font-bold text-orange-500">100%</h3>
              <p className="mt-2 text-gray-600">Digital Experience</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-orange-100 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CafeSync. All rights reserved.
      </footer>
    </div>
  );
}
