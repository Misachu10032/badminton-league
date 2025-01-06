"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Dashboard from "../components/Home/DashBoard";
import RecordMatchModal from "../components/Home/RecordMatchModal"; // Import the modal component

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
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

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </div>
      </nav>

      {/* Pass the user data to the Dashboard component */}
      <Dashboard user={user} />

      {/* Open Modal Button */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Open Modal
        </button>
      </div>

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
