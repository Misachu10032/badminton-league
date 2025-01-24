import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils/formatDate";

const MatchDetailModal = ({ matchId, onClose }) => {
  const [matchDetails, setMatchDetails] = useState(null);

  // Fetch match details
  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`/api/get-match/${matchId}`); // Replace with your API endpoint
        const data = await response.json();

        console.log(data);
        setMatchDetails(data);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    if (matchId) {
      fetchMatchDetails();
    }
  }, [matchId]);

  if (!matchDetails) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg">
          <p>Loading match details...</p>
        </div>
      </div>
    );
  }

  // Instead of destructuring, access properties directly
  const match = matchDetails.match || {}; // Use matchDetails.match if it exists
  const { createdAt, team1, team2, scores } = match;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Match Details</h2>

        {/* Date */}
        <div className="mb-4">
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {createdAt ? formatDate(createdAt) : "Not Available"}
          </p>
        </div>

        {/* Players and Score Changes */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Team 1</h3>
          {team1 &&
            team1.map((player) => (
              <p key={player.userId}>
                {player.name}: + {player.scoreChanges}
              </p>
            ))}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Team 2</h3>
          {team2 &&
            team2.map((player) => (
              <p key={player.userId}>
                {player.name}: + {player.scoreChanges}
              </p>
            ))}
        </div>

        {/* Match Scores */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Match Scores</h3>
          {scores &&
            scores.map((score, index) => (
              <p key={index}>
                Game {index + 1}: {score.team1}- {score.team2}
              </p>
            ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MatchDetailModal;
