"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterRequestModal from "@/components/Login/RegisterRequestModal";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        router.push("/home");
      } else {
        const errorText = await res.text();
        setError(errorText || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h1>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="appearance-none rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
          <button
            onClick={() => (window.location.href = "/rules")}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mt-2"
          >
            Rules
          </button>
        </form>
      </div>

      {isModalOpen && (
        <RegisterRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
