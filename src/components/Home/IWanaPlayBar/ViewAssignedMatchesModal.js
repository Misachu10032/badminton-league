import React from "react";

const AssignedMatchesModal = ({ isOpen, onClose, groups, date }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Assigned Matches</h2>

        {/* Clear, larger instructional text */}
        <div className="p-4 mb-6 rounded">
          <p className="text-base text-gray-800 mb-2">
            📅 <strong>Please check the match date below.</strong>
          </p>
          <p className="text-base text-gray-800 mb-2">
            ✅ To be assigned a match for a specific day, you must sign up <strong>the day before</strong>.
          </p>
          <p className="text-base text-gray-800">
            🙌 All matches are <strong>optional</strong>, so feel free swap players and play with different players.
          </p>
        </div>

        {/* Match Date */}
        {date && (
          <div className="mb-4">
            <p className="text-base text-gray-700">
              <span className="font-semibold">Match Date:</span>{" "}
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Assigned Groups */}
        {groups && groups.length > 0 ? (
          <div className="space-y-4">
            {groups.map((group, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-800 mb-1">Match {index + 1}</h3>
                <ul className="list-disc list-inside ml-4 text-gray-700">
                  {group.map((name, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No matches found for you in the latest session.</p>
        )}

        {/* Close Button */}
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

export default AssignedMatchesModal;
