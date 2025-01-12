"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Dashboard from "../components/Home/DashBoard";
import RecordMatchModal from "../components/Home/RecordMatchModal"; // Import the modal component
import UserRank from "../components/Home/UserRank";
import IconButton from "@mui/material/IconButton"; // Import IconButton from Material-UI
import RefreshIcon from "@mui/icons-material/Refresh"; // Import Refresh Icon from Material-UI

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const fetchUserData = async () => {
    const userId = Cookies.get("userID");
    if (!userId) {
      alert("User not logged in");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/get-user/${userId}`, { method: "GET" });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Failed to fetch user data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Remove cookies
    Cookies.remove("userID");
    Cookies.remove("token");
    alert("You have been logged out!");
    // Redirect to login page or refresh the page
    window.location.href = "/login";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg rounded-lg mb-6 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Badminton League</h1>
          <div className="flex space-x-4">
            {user?.role === "Admin" && (
              <button
                onClick={() => (window.location.href = "/admin")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
              >
                Admin Panel
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Pass the user data to the Dashboard component */}
      <UserRank score={user?.score} />
      <div className="mt-10 ml-4 flex items-center space-x-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700"
        >
          + New Request
        </button>
        <IconButton
          onClick={fetchUserData}
          aria-label="refresh"
          className="shadow-lg p-2 blue-700 rounded-full"

        >
          <RefreshIcon className="text-blue-500 h-6 w-6" />
        </IconButton>
      </div>

      <Dashboard user={user} />

      {/* Popup Modal */}
      {isModalOpen && (
        <RecordMatchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentUser={user}
        />
      )}
    </div>
  );
}
