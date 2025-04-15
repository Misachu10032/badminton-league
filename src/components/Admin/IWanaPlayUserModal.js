import React from "react";

const IWanaPlayUserModal = ({ isOpen, onClose, players }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Active Players</h2>

        <div className="p-4 mb-6 rounded">
          <p className="text-base text-gray-800 mb-2">
            ✅ The following players have marked themselves as <strong>"I want to play"</strong>.
          </p>
          <p className="text-base text-gray-800">
            🏸 This list helps us match players who are available and interested.
          </p>
        </div>

        {players && players.length > 0 ? (
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
            {players.map((player, index) => (
              <li key={index}>
                {player.name} <span className="text-sm text-gray-500">({player.userId})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No active players found at the moment.</p>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IWanaPlayUserModal;
