import { useState, useMemo } from "react";

export default function PlayerSelectionTable({ users, onClose, onSelect }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(
    () =>
      users
        .filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [users, searchQuery]
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6">
      <div className="bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl shadow-xl p-4 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            Select Player
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>

        {/* Player Grid */}
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => onSelect(user)}
                className="cursor-pointer p-4 border border-gray-200 rounded-xl bg-white hover:bg-blue-50 hover:border-blue-300 hover:shadow transition"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg sm:text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate w-full text-center">
                    {user.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="mt-4 text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-xl">
            No players found
          </div>
        )}
      </div>
    </div>
  );
}
