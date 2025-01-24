"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import IconButton from "@mui/material/IconButton"; // Import IconButton from Material-UI
import RefreshIcon from "@mui/icons-material/Refresh"; // Import Refresh Icon from Material-UI
import UserRank from "@/components/Home/UserRank";
import RecordMatchModal from "@/components/Home/RecordMatchModal";
import Dashboard from "@/components/Home/DashBoard";
import { fetchAndSortMatches } from "../../utils/helpers/fetchmatches";
import { triggerNotification } from "../../utils/eventBus";



export default function HomePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [matches, setMatches] = useState({ pending: [], confirmed: [] });


  const fetchUserData = async () => {
    try {
      const userId = Cookies.get("userID");
      if (!userId) {
        alert("User not logged in");
        return;
      }

      setIsLoading(true);

      // Fetch user data
      const res = await fetch(`/api/get-user/${userId}`, { method: "GET" });
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await res.json();
      setUser(userData);
      console.log("userData", userData.requests);
      fetchAndSortMatches(userData, setMatches);
    } catch (error) {
      console.error("Error fetching user or match data:", error.message);
      alert("An error occurred while fetching data. Please try again.");
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


  
  const test = () => {
      triggerNotification('This is a custom notification!');

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Navbar */}
      <nav className="bg-white shadow-md rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Badminton League</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => (window.location.href = "/rules")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
            >
              Rules
            </button>
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
      <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
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


      <div className="mt-10 ml-4 flex items-center space-x-2">
        <button
          onClick={test}
          className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700"
        >
          + test
        </button>

      </div>

      <Dashboard user={user} matches={matches} setMatches={setMatches} setUser={setUser}  />

      {/* Popup Modal */}
      {isModalOpen && (
        <RecordMatchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentUser={user}
          matches={matches}
          fetchUserData={fetchUserData}
        />
      )}
    </div>
  );
}
