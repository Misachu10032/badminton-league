"use client";
import { useEffect, useState } from "react";
import { triggerNotification } from "../../utils/eventBus";

const RegisterPage = () => {
  const [queryParams, setQueryParams] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
  });
  const [users, setUsers] = useState([]);

  // Fetch query params and user data based on id
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const params = {};
    urlParams.forEach((value, key) => {
      params[key] = value;
    });
    setQueryParams(params);

    if (params.id) {
      fetchUserData(params.id);
    } else {
      setError("ID not found in the url");
    }
    fetchAllUsers();
  }, []);

  // Fetch user data based on id
  const fetchUserData = async (id) => {
    try {
      const res = await fetch(`/api/get-register-request?id=${id}`);
      const data = await res.json();

      if (data.email) {
        setUserEmail(data.email);
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError("Error fetching user data");
    }
  };

  // Fetch all users for comparison
  const fetchAllUsers = async () => {
    try {
      const res = await fetch("/api/get-all-users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      setError("Error fetching users");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if name already exists (case-insensitive)
    const existingUser = users.find(
      (user) => user.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (existingUser) {
      setError("Name already taken");
      return;
    }

    try {
      const res = await fetch("/api/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email: userEmail,
          requestId: queryParams.id,
        }),
      });

      if (res.ok) {
        triggerNotification(
          "Registration successful.\n Please check out the rules page before login with your email."
        );
      } else {
        const result = await res.json();
        // Check if there's a message in the response, otherwise use a generic message
        const errorMessage =
          result?.message || "Registration failed. Please try again.";
        setError(errorMessage);
      }
    } catch (err) {
      // Catch network errors or other unexpected issues
      setError("An error occurred while registering. Please try again later.");
    } finally {
      window.location.href = "/rules";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Confirm Registration</h1>

      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={userEmail}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Please enter a recognizable name"
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
