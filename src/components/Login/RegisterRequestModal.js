import Modal from "react-modal";
import { useState } from "react";

export default function RegisterRequestModal({ isOpen, onClose }) {
  const [error, setError] = useState("");

  const handleRegisterRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    let description = formData.get("description");
    const name = formData.get("name");

    // If description is empty, set it to a single space
    if (!description) {
      description = " ";
    }

    try {
      const res = await fetch("/api/register-request", {
        method: "POST",
        body: JSON.stringify({ email, description, name }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setError("");
        onClose();
      } else {
        const errorText = await res.text();
        setError(errorText || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: "80%",
          maxWidth: "500px",
          height: "50%",
          margin: "auto",
          borderRadius: "10px",
          padding: "30px",
          border: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: "1",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: "0",
        },
      }}
      ariaHideApp={false}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          After you register, please check your email for the confirmation link.
        </p>
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-100 border border-red-400 rounded-md p-2 w-full text-center">
            {error}
          </div>
        )}
        <form className="w-full space-y-4" onSubmit={handleRegisterRequest}>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email address"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Who Referred you/How did you find us?
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="This is optional"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
