"use client";
import { useState, useEffect } from "react";

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch("/api/get-all-register-requests");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    }
    fetchRequests();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await fetch(`/api/confirm-register-request/${id}`, { method: "POST" });
      setRequests(requests.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Failed to confirm request:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await fetch(`/api/decline-register-request?id=${id}`, { method: "POST" });
      setRequests(requests.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Failed to decline request:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("userID");
    Cookies.remove("token");
    alert("You have been logged out!");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <nav className="bg-white shadow-md rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Badminton League</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => (window.location.href = "/home")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Registration Requests</h2>
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{request.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{request.status}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleConfirm(request._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleDecline(request._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
                    >
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Requests;
