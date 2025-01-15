// UserManagementTable.js

import { useState } from "react";
import DoubleCheckModal from "../common/DoubleCheckModal";
const UserManagementTable = ({ users, handleEditUser, setUsers }) => {
  const [isDoubleCheckModalOpen, setIsDoubleCheckModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

  const onDeleteButtonClicked = async (userId) => {
    setUserIdToDelete(userId);
    setIsDoubleCheckModalOpen(true);
  };


  
  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`/api/delete-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userIdToDelete }),
      });

      if (res.ok) {
        alert("User deleted successfully!");
        // Refresh users list or update state as needed
      } else {
        const error = await res.json();
        console.error("Error deleting user:", error);
        alert(error.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    } finally {
      // Update the state to remove the deleted user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userIdToDelete));
      setIsDoubleCheckModalOpen(false);
      setUserIdToDelete(null);
    }
  };


  return (
    <div>
      <table className="min-w-full bg-white border-collapse mt-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Score
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-600">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.score}</td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user._id)}
                    className={`w-24 py-2 rounded-lg shadow-md transition duration-200 
                  
                       "cursor-not-allowed bg-gray-400 text-gray-700"
            
                  `}
                    disabled
                  >
                    Edit
                  </button>
            
                  <button
                        onClick={() => onDeleteButtonClicked(user._id)}
                        className="bg-red-600 text-white p-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-red-700 transition duration-200 w-full sm:w-auto"
                      >
                        X
                      </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDoubleCheckModalOpen && (
      <DoubleCheckModal
      title="Delete User"
      message="Are you sure you want to delete this user?"
        isOpen={isDoubleCheckModalOpen}
        onClose={() => setIsDoubleCheckModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      )}
    </div>
  );
};

export default UserManagementTable;
