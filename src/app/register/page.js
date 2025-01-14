// pages/register.js
"use client";
import { useEffect, useState } from 'react';

const RegisterPage = () => {
  const [queryParams, setQueryParams] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    sex: ''
  });

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
    }
  }, []);

  // Fetch user data based on id
  const fetchUserData = async (id) => {
    try {
      const res = await fetch(`/api/user-register-request?id=${id}`);
      const data = await res.json();

      if (data.email) {
        setUserEmail(data.email);
      } else {
        setError('User not found');
      }
    } catch (error) {
      setError('Error fetching user data');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, email: userEmail }),
      });

      if (res.ok) {
        const result = await res.json();
        alert('Registration successful');
      } else {
        const result = await res.json();
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred');
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
      <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>

      {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>}

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
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sex</label>
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
            <option value="other">Other</option>
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
