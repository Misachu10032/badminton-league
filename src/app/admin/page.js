"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import RegistrationTable from "@/components/Admin/RegistrationTable";
import UserManagementTable from "@/components/Admin/UserManagementTable";

function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [requestsResponse, usersResponse] = await Promise.all([
          fetch("/api/get-all-register-requests"),
          fetch("/api/get-all-users"), // Assuming this endpoint exists
        ]);

        const requestsData = await requestsResponse.json();
        const usersData = await usersResponse.json();

        setRequests(requestsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await fetch(`/api/confirm-register-request/${id}`, { method: "POST" });
      setRequests(
        requests.map((request) =>
          request._id === id ? { ...request, status: "Pending" } : request
        )
      );
    } catch (error) {
      console.error("Failed to confirm request:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await fetch(`/api/decline-register-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (response.ok) {
        setRequests(requests.filter((request) => request._id !== id));
        console.log(result.message);
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Failed to decline request:", error);
    }
  };

  const handlecron = async () => {
    // Fetch user data
    const res = await fetch(`/api/cron-jobs/set-I-wana-play-to-false`, {
      method: "GET",
    });
  };

  const handleMatchMaking = async () => {
    // Fetch user data
    const res = await fetch(`/api/cron-jobs/create-match-groups`, {
      method: "GET",
    });
  };
  const viewMatchmaking = async () => {
    const userId = Cookies.get("userID");
    const res = await fetch(`/api/get-match-groups?userId=${userId}`, {
      method: "GET",
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.error("Failed to fetch match groups");
    }
  };

  const handleEditUser = async (id) => {
    console.log("Edit user with id:", id);
  };

  const handleLogout = () => {
    Cookies.remove("userID");
    Cookies.remove("token");
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
        <div className="flex space-x-4">
          <button
            onClick={handlecron}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          >
            update Wana Play
          </button>
          <button
            onClick={handleMatchMaking}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          >
            match making
          </button>
          <button
            onClick={viewMatchmaking}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          >
            view match making
          </button>
        </div>
      </nav>
      <div className="bg-white shadow-md rounded-lg p-6">
        <RegistrationTable
          requests={requests}
          handleConfirm={handleConfirm}
          handleDecline={handleDecline}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <UserManagementTable
          users={users}
          handleEditUser={handleEditUser}
          setUsers={setUsers}
        />
      </div>
    </div>
  );
}

export default AdminPage;