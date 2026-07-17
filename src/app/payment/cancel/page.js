"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Cancel() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/orders");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-yellow-600">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-gray-600">You cancelled the payment.</p>

        <p className="mt-2 text-sm text-gray-500">
          Redirecting to your orders...
        </p>
      </div>
    </div>
  );
}
