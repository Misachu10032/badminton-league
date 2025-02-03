import { useState } from "react";
import DoubleCheckModal from "../common/DoubleCheckModal";
import EditUserModal from "./EditUserModal";

const UserManagementTable = ({ users, setUsers }) => {
  const [isDoubleCheckModalOpen, setIsDoubleCheckModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [isTableCollapsed, setIsTableCollapsed] = useState(true); // New state for collapsing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [userToEdit, setUserToEdit] = useState(null); // State for user being edited

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
      } else {
        const error = await res.json();
        console.error("Error deleting user:", error);
        alert(error.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    } finally {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userIdToDelete)
      );
      setIsDoubleCheckModalOpen(false);
      setUserIdToDelete(null);
    }
  };

  // Function to toggle table collapse state
  const toggleCollapse = () => {
    setIsTableCollapsed(!isTableCollapsed);
  };

  const handleEditClick = (user) => {

    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h2 className="sm:text-3xl text-lg font-semibold text-gray-800">
          User Management
        </h2>

        <button onClick={toggleCollapse} className="text-blue-500 underline">
          {isTableCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>

      <table
        className={`min-w-full bg-white border-collapse mt-6 ${
          isTableCollapsed ? "hidden" : ""
        }`}
      >
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr
              key={user._id}
              className="border rounded-lg bg-gray-50 shadow flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4"
            >
              <td className="w-full sm:w-1/5 mb-2 sm:mb-0 text-sm text-gray-600 font-bold text-lg ">
                {user.name}
              </td>
              <td className="w-full sm:w-2/5 mb-2 sm:mb-0 text-sm text-gray-600">
                {user.email}
              </td>
              <td className="w-full sm:w-1/5 mb-2 sm:mb-0 text-sm text-gray-500">
                {user.score}
              </td>
              <td className="w-full sm:w-auto flex space-x-2">
                <button
                  onClick={() => handleEditClick(user)}
                  className={
                    "w-24 py-2 rounded-lg shadow-md transition duration-200  bg-blue-600 text-white hover:bg-blue-700"
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteButtonClicked(user._id)}
                  className="bg-red-600 text-white p-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-red-700 transition duration-200 w-10 sm:w-auto"
                >
                  X
                </button>
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

      {isEditModalOpen && (
        <EditUserModal
          user={userToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default UserManagementTable;
