"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/orders");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="mt-3 text-gray-600">
          Your payment has been completed successfully.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Redirecting to your orders...
        </p>
      </div>
    </div>
  );
}
