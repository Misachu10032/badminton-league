import { useState } from "react";
import { triggerNotification } from "../../utils/eventBus";

export default function RegisterRequestModal({ isOpen, onClose }) {
  const [error, setError] = useState("");

  const handleRegisterRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    let description = formData.get("description");
    const name = formData.get("name");

    if (!description) description = " ";

    try {
      const res = await fetch("/api/register-request", {
        method: "POST",
        body: JSON.stringify({ email, description, name }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setError("");
        triggerNotification("Please wait for the Admin to approve", "success");
        onClose();
      } else {
        const errorText = await res.text();
        setError(errorText || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // ⬅️ Clicking backdrop closes modal
    >
      <div
        className="bg-white w-[90%] max-w-md max-h-[90vh] overflow-y-auto p-5 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // ⬅️ Prevent clicks inside from closing
      >
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Register
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-4 text-center">
            After registering, check your email for a confirmation link. It will
            be sent once the admin approves your request.
          </p>

          {error && (
            <div className="mb-3 text-sm text-red-600 bg-red-100 border border-red-400 rounded p-2 w-full text-center">
              {error}
            </div>
          )}

          <form className="w-full space-y-3" onSubmit={handleRegisterRequest}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Smith"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Who Referred You / How Did You Find Us?
              </label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="This is optional"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
            >
              Register
            </button>
          </form>

          <button
            onClick={onClose}
            className="mt-3 text-sm text-gray-500 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
